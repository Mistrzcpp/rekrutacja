const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/dodaj", async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const d = req.body;

    //adres kandydata
    const adresK = await client.query(
      `INSERT INTO adresy
       (miejscowosc, kod_pocztowy, ulica, nr_domu, nr_lokalu,
        wojewodztwo, poczta, gmina)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING id`,
      [
        d.miejscowosc,
        d.kod_pocztowy,
        d.ulica,
        d.numer_domu,
        d.numer_lokalu || null,
        d.wojewodztwo,
        d.poczta,
        d.gmina,
      ],
    );

    const adresKId = adresK.rows[0].id;

    //dane osobowe kandydata
    const kandydatOs = await client.query(
      `INSERT INTO dane_osobowe
       (imie, drugie_imie, nazwisko, email, adres_id,
        pesel, data_urodzenia, miejsce_urodzenia)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING id`,
      [
        d.imie,
        d.drugie_imie || null,
        d.nazwisko,
        d.email,
        adresKId,
        d.pesel,
        d.data_urodzenia,
        d.miejsce_urodzenia,
      ],
    );

    const daneOsId = kandydatOs.rows[0].id;

    //adres matki
    let adresMatkiId = null;

    if (d.inny_adres_matki) {
      const adresM = await client.query(
        `INSERT INTO adresy
         (miejscowosc, kod_pocztowy, ulica, nr_domu, nr_lokalu,
          wojewodztwo, poczta, gmina)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
         RETURNING id`,
        [
          d.miejscowosc_matki,
          d.kod_pocztowy_matki,
          d.ulica_matki,
          d.numer_domu_matki,
          d.numer_lokalu_matki || null,
          d.wojewodztwo_matki,
          d.poczta_matki,
          d.gmina_matki,
        ],
      );
      adresMatkiId = adresM.rows[0].id;
    } else {
      adresMatkiId = adresKId;
    }

    //dane matki
    const matka = await client.query(
      `INSERT INTO dane_osobowe
       (imie, nazwisko, numer_tel, adres_id)
       VALUES ($1,$2,$3,$4)
       RETURNING id`,
      [d.imie_matki, d.nazwisko_matki, d.tel_matki, adresMatkiId],
    );

    const matkaId = matka.rows[0].id;

    //adres ojca
    let adresOjcaId = null;

    if (d.inny_adres_ojca) {
      const adresO = await client.query(
        `INSERT INTO adresy
         (miejscowosc, kod_pocztowy, ulica, nr_domu, nr_lokalu,
          wojewodztwo, poczta, gmina)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
         RETURNING id`,
        [
          d.miejscowosc_ojca,
          d.kod_pocztowy_ojca,
          d.ulica_ojca,
          d.numer_domu_ojca,
          d.numer_lokalu_ojca || null,
          d.wojewodztwo_ojca,
          d.poczta_ojca,
          d.gmina_ojca,
        ],
      );
      adresOjcaId = adresO.rows[0].id;
    } else {
      adresOjcaId = adresKId;
    }

    //dane ojca
    const ojciec = await client.query(
      `INSERT INTO dane_osobowe
       (imie, nazwisko, numer_tel, adres_id)
       VALUES ($1,$2,$3,$4)
       RETURNING id`,
      [d.imie_ojca, d.nazwisko_ojca, d.tel_ojca, adresOjcaId],
    );

    const ojciecId = ojciec.rows[0].id;

    //wyniki
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

    //kandydat
    const kandydat = await client.query(
      `INSERT INTO kandydaci
       (dane_osobowe_id, dane_matki_id, dane_ojca_id, wynik_id, inny_adres_matki, inny_adres_ojca)
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

    const wybraneKierunki = [d.kierunek_1, d.kierunek_2, d.kierunek_3].filter(
      (k) => k && k !== "",
    );

    //punkty
    let punkty = 0;
    if (d.swiadectwo_z_wyroznieniem) punkty += 7;
    punkty += d.egzamin_polski * 0.35;
    punkty += d.egzamin_matematyka * 0.35;
    punkty += d.egzamin_angielski * 0.3;
    if (d.ocena_polski == 6) punkty += 18;
    if (d.ocena_polski == 5) punkty += 17;
    if (d.ocena_polski == 4) punkty += 14;
    if (d.ocena_polski == 3) punkty += 8;
    if (d.ocena_polski == 2) punkty += 2;

    if (d.ocena_matematyka == 6) punkty += 18;
    if (d.ocena_matematyka == 5) punkty += 17;
    if (d.ocena_matematyka == 4) punkty += 14;
    if (d.ocena_matematyka == 3) punkty += 8;
    if (d.ocena_matematyka == 2) punkty += 2;

    if (d.ocena_angielski == 6) punkty += 18;
    if (d.ocena_angielski == 5) punkty += 17;
    if (d.ocena_angielski == 4) punkty += 14;
    if (d.ocena_angielski == 3) punkty += 8;
    if (d.ocena_angielski == 2) punkty += 2;

    for (let i = 0; i < wybraneKierunki.length; i++) {
      const ocenaDodatkowa = d[`dodatkowy_przedmiot_${i + 1}_ocena`] || null;

      if (ocenaDodatkowa == 6) punkty += 18;
      if (ocenaDodatkowa == 5) punkty += 17;
      if (ocenaDodatkowa == 4) punkty += 14;
      if (ocenaDodatkowa == 3) punkty += 8;
      if (ocenaDodatkowa == 2) punkty += 2;

      await client.query(
        `INSERT INTO wnioski
      (data, kandydat_id, szkola, kierunek_id,
       wiodacy_jezyk_obcy, dodatkowy_jezyk_obcy,
       pierwszy_wybor_szkoly, ktory_wybor_kierunku,
       swiadectwo_z_wyroznieniem, wynik_id, ocena_dodatkowa, punkty)
     VALUES (NOW(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          kandydatId,
          d.szkola,
          wybraneKierunki[i],
          d.wiodacy_jezyk_obcy,
          d.dodatkowy_jezyk_obcy || null,
          d.pierwszy_wybor_szkoly,
          i + 1,
          d.swiadectwo_z_wyroznieniem,
          wynikId,
          ocenaDodatkowa,
          Math.round(punkty),
        ],
      );
    }

    await client.query("COMMIT");

    res.json({ success: true });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ error: "Błąd zapisu danych" });
  } finally {
    client.release();
  }
});

module.exports = router;
