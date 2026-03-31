const express = require("express");
const router = express.Router();
const pool = require("../db");
const multer = require("multer");
const { parse } = require("csv-parse/sync");

// w pamięci (nie zapisujemy na dysku)
const upload = multer({ storage: multer.memoryStorage() });

const profileMap = {
  "Profil medyczny (biologia, chemia)": 1,
  "Profil dwujęzyczny (po angielsku: biol., hist., geogr., fiz.": 2,
  "Profil uniwersytecki (język angielski, geografia, matematyka)": 3,
  "Profil uniwersytecki z biologią (matematyka, biologia, angielski)": 4,
  "Profil prawniczo-dziennikarski (j. polski, historia, wos)": 5,
  "Profil przyrodniczo-humanistyczny (biologia, j. polski)": 6,
  "Profil politechniczny (matematyka, fizyka, j. angielski)": 7,
  "Profil politechniczny z chemią (matematyka, chemia, angielski)": 8,
  "Profil sportowy (j. angielski, geografia, siatkówka)": 9,
  "Profil medyczny z matematyką (biologia, chemia, matemetyka)": 10,
  "Technik informatyk": 11,
  "Technik programista": 12,
  "Technik reklamy": 13,
};
const mapProfile = (text) => {
  if (!text || text.trim() === "") return 14; // pusty → 14
  return profileMap[text.trim()] || 14; // nieznany → 14
};
const parseNumberOrNull = (v) => {
  if (!v) return null; // null / undefined / ""
  const s = v.toString().trim();
  if (s === "") return null; // pusty string
  return parseFloat(s.replace(",", ".")); // zamiana przecinka na kropkę
};

router.post("/importuj", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: "Brak pliku" });
  }

  const client = await pool.connect();

  try {
    const text = req.file.buffer.toString("utf-8");

    const records = parse(text, {
      delimiter: ",",
      quote: '"',
      columns: true,
      skip_empty_lines: true,
      relax_column_count: true
    });

    const candidates = records.map((row) => ({
      data: row[0],
      pierwszy_wybor_szkoly: row[1] == "1 wyboru",

      k_imie: row[18],
      k_drugie_imie: row[19],
      k_nazwisko: row[20],
      miejsce_urodzenia: row[21],
      pesel: row[22],
      //data_urodzenia: row[7] && row[7].trim() !== "" ? row[7] : null,
      data_urodzenia: row[23],
      k_miejscowosc: row[24],
      ulica: row[25],
      nr_domu: row[26],
      nr_lokalu: row[27],
      kod_pocztowy: row[28],
      gmina: row[29],
      poczta: row[30],
      wojewodztwo: row[31],

      matka_imie: row[32],
      matka_nazwisko: row[33],
      matka_tel: row[34],
      //inny_adres_matki: row[19] === "n",
      inny_adres_matki: row[19] != "Tak, jak adres zamieszkania dziecka",
      matka_miejscowosc: row[36],
      matka_kod_pocztowy: row[37],
      matka_ulica: row[38],
      matka_nr_domu: row[39],
      matka_nr_lokalu: row[40],

      ojciec_imie: row[41],
      ojciec_nazwisko: row[42],
      ojciec_tel: row[43],
      //inny_adres_ojca: row[28] === "n",
      inny_adres_ojca: row[44] != "Tak, jak adres zamieszkania dziecka",
      ojciec_miejscowosc: row[45],
      ojciec_kod_pocztowy: row[46],
      ojciec_ulica: row[47],
      ojciec_nr_domu: row[48],
      ojciec_nr_lokalu: row[49],

      pierwszy_kierunek_id: mapProfile(row[7]),
      drugi_kierunek_id: mapProfile(row[8]),
      trzeci_kierunek_id: mapProfile(row[9]),

      wiodacy_jezyk_obcy: row[15],
      dodatkowy_jezyk_obcy: row[16],

      ocena_polski: parseNumberOrNull(row[72]),
      ocena_angielski: parseNumberOrNull(row[73]),
      ocena_matematyka: parseNumberOrNull(row[74]),
      ocena_dodatkowa: parseNumberOrNull(row[75]),
      egzamin_polski: parseNumberOrNull(row[77]),
      egzamin_matematyka: parseNumberOrNull(row[78]),
      egzamin_angielski: parseNumberOrNull(row[79]),
      swiadectwo_z_wyroznieniem: row[76] == "t",

      punkty: row[91],
      oryginal_swiadectwa: row[48] === "t",
    }));

    await client.query("BEGIN");

    for (const d of candidates) {
      console.log(d);
      const adresK = await client.query(
        `INSERT INTO adresy
         (miejscowosc, kod_pocztowy, ulica, nr_domu, nr_lokalu,
          wojewodztwo, poczta, gmina)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
         RETURNING id`,
        [
          d.k_miejscowosc,
          d.kod_pocztowy,
          d.ulica,
          d.nr_domu,
          d.nr_lokalu || null,
          d.wojewodztwo,
          d.poczta,
          d.gmina,
        ],
      );

      const adresKId = adresK.rows[0].id;

      const kandydatOs = await client.query(
        `INSERT INTO dane_osobowe
         (imie, drugie_imie, nazwisko, pesel,
          data_urodzenia, miejsce_urodzenia, adres_id)
         VALUES ($1,$2,$3,$4,$5,$6,$7)
         RETURNING id`,
        [
          d.k_imie,
          d.k_drugie_imie || null,
          d.k_nazwisko,
          d.pesel,
          d.data_urodzenia,
          d.miejsce_urodzenia,
          adresKId,
        ],
      );

      const daneOsId = kandydatOs.rows[0].id;

      let adresMatkiId = adresKId;

      if (d.inny_adres_matki) {
        const adresM = await client.query(
          `INSERT INTO adresy
           (miejscowosc, kod_pocztowy, ulica, nr_domu, nr_lokalu)
           VALUES ($1,$2,$3,$4,$5)
           RETURNING id`,
          [
            d.matka_miejscowosc,
            d.matka_kod_pocztowy,
            d.matka_ulica,
            d.matka_nr_domu,
            d.matka_nr_lokalu || null,
          ],
        );
        adresMatkiId = adresM.rows[0].id;
      }

      const matka = await client.query(
        `INSERT INTO dane_osobowe
         (imie, nazwisko, numer_tel, adres_id)
         VALUES ($1,$2,$3,$4)
         RETURNING id`,
        [d.matka_imie, d.matka_nazwisko, d.matka_tel, adresMatkiId],
      );

      const matkaId = matka.rows[0].id;

      let adresOjcaId = adresKId;

      if (d.inny_adres_ojca) {
        const adresO = await client.query(
          `INSERT INTO adresy
           (miejscowosc, kod_pocztowy, ulica, nr_domu, nr_lokalu)
           VALUES ($1,$2,$3,$4,$5)
           RETURNING id`,
          [
            d.ojciec_miejscowosc,
            d.ojciec_kod_pocztowy,
            d.ojciec_ulica,
            d.ojciec_nr_domu,
            d.ojciec_nr_lokalu || null,
          ],
        );
        adresOjcaId = adresO.rows[0].id;
      }

      const ojciec = await client.query(
        `INSERT INTO dane_osobowe
         (imie, nazwisko, numer_tel, adres_id)
         VALUES ($1,$2,$3,$4)
         RETURNING id`,
        [d.ojciec_imie, d.ojciec_nazwisko, d.ojciec_tel, adresOjcaId],
      );

      const ojciecId = ojciec.rows[0].id;

      const wyniki = await client.query(
        `INSERT INTO wyniki
         (ocena_polski, ocena_matematyka, ocena_angielski,
          egzamin_polski, egzamin_matematyka, egzamin_angielski)
         VALUES ($1,$2,$3,$4,$5,$6)
         RETURNING id`,
        [
          d.ocena_polski,
          d.ocena_matematyka,
          d.ocena_angielski,
          d.egzamin_polski,
          d.egzamin_matematyka,
          d.egzamin_angielski,
        ],
      );

      const wynikId = wyniki.rows[0].id;

      const kandydat = await client.query(
        `INSERT INTO kandydaci
         (dane_osobowe_id, dane_matki_id, dane_ojca_id,
          wynik_id, inny_adres_matki, inny_adres_ojca)
         VALUES ($1,$2,$3,$4,$5,$6)
         RETURNING id`,
        [
          daneOsId,
          matkaId,
          ojciecId,
          wynikId,
          d.inny_adres_matki,
          d.inny_adres_ojca,
        ],
      );

      const kandydatId = kandydat.rows[0].id;

      d.pierwszy_kierunek_id < 11 ? (szkola = "LO") : (szkola = "TIE");

      const punkty = parseFloat(d.punkty?.replace(",", "."));
      const punktyZaokraglone = isNaN(punkty) ? 0 : Math.round(punkty);

      console.log("punkty:", punktyZaokraglone);
      await client.query(
        `INSERT INTO wnioski
         (data, kandydat_id,
          wiodacy_jezyk_obcy, dodatkowy_jezyk_obcy,
          pierwszy_wybor_szkoly,
          swiadectwo_z_wyroznieniem,
          ocena_dodatkowa,
          punkty,
          pierwszy_kierunek_id, drugi_kierunek_id, trzeci_kierunek_id,
          wynik_id, oryginal_swiadectwa, szkola)
         VALUES
         (NOW(), $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
        [
          kandydatId,
          d.wiodacy_jezyk_obcy,
          d.dodatkowy_jezyk_obcy,
          d.pierwszy_wybor_szkoly,
          d.swiadectwo_z_wyroznieniem,
          d.ocena_dodatkowa,
          punktyZaokraglone,
          d.pierwszy_kierunek_id,
          d.drugi_kierunek_id,
          d.trzeci_kierunek_id,
          wynikId,
          d.oryginal_swiadectwa,
          szkola,
        ],
      );
    }

    await client.query("COMMIT");

    res.json({ success: true, count: candidates.length });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  } finally {
    client.release();
  }
});

module.exports = router;
