// backend/routes/wnioski.js
const express = require("express");
const router = express.Router();
const pool = require("../db");

// === Edycja istniejącego wniosku ===
router.put("/edytuj/:id", async (req, res) => {
  const client = await pool.connect();
  const wniosekId = req.params.id;
  const d = req.body;

  try {
    await client.query("BEGIN");

    // Pobranie ID kandydatów i powiązanych rekordów
    const { rows } = await client.query(
      `SELECT w.kandydat_id, k.dane_osobowe_id, k.dane_matki_id, k.dane_ojca_id, k.wynik_id
       FROM wnioski w
       JOIN kandydaci k ON w.kandydat_id = k.id
       WHERE w.id = $1`,
      [wniosekId],
    );

    if (!rows[0]) {
      return res.status(404).json({ error: "Nie znaleziono wniosku" });
    }

    const {
      kandydat_id,
      dane_osobowe_id,
      dane_matki_id,
      dane_ojca_id,
      wynik_id,
    } = rows[0];

    // === Aktualizacja adresu kandydata ===
    await client.query(
      `UPDATE adresy
       SET miejscowosc=$1, kod_pocztowy=$2, ulica=$3, nr_domu=$4, nr_lokalu=$5,
           wojewodztwo=$6, poczta=$7, gmina=$8
       WHERE id = (SELECT adres_id FROM dane_osobowe WHERE id=$9)`,
      [
        d.miejscowosc,
        d.kod_pocztowy,
        d.ulica,
        d.numer_domu,
        d.numer_lokalu || null,
        d.wojewodztwo,
        d.poczta,
        d.gmina,
        dane_osobowe_id,
      ],
    );

    // === Aktualizacja danych osobowych kandydata ===
    await client.query(
      `UPDATE dane_osobowe
       SET imie=$1, drugie_imie=$2, nazwisko=$3, email=$4, pesel=$5, data_urodzenia=$6,
           miejsce_urodzenia=$7
       WHERE id=$8`,
      [
        d.imie,
        d.drugie_imie || null,
        d.nazwisko,
        d.email,
        d.pesel,
        d.data_urodzenia,
        d.miejsce_urodzenia,
        dane_osobowe_id,
      ],
    );

    // === Aktualizacja matki ===
    if (d.inny_adres_matki) {
      await client.query(
        `UPDATE adresy
         SET miejscowosc=$1, kod_pocztowy=$2, ulica=$3, nr_domu=$4, nr_lokalu=$5,
             wojewodztwo=$6, poczta=$7, gmina=$8
         WHERE id = (SELECT adres_id FROM dane_osobowe WHERE id=$9)`,
        [
          d.miejscowosc_matki,
          d.kod_pocztowy_matki,
          d.ulica_matki,
          d.numer_domu_matki,
          d.numer_lokalu_matki || null,
          d.wojewodztwo_matki,
          d.poczta_matki,
          d.gmina_matki,
          dane_matki_id,
        ],
      );
    }

    await client.query(
      `UPDATE dane_osobowe
       SET imie=$1, nazwisko=$2, numer_tel=$3
       WHERE id=$4`,
      [d.imie_matki, d.nazwisko_matki, d.tel_matki, dane_matki_id],
    );

    // === Aktualizacja ojca ===
    if (d.inny_adres_ojca) {
      await client.query(
        `UPDATE adresy
         SET miejscowosc=$1, kod_pocztowy=$2, ulica=$3, nr_domu=$4, nr_lokalu=$5,
             wojewodztwo=$6, poczta=$7, gmina=$8
         WHERE id = (SELECT adres_id FROM dane_osobowe WHERE id=$9)`,
        [
          d.miejscowosc_ojca,
          d.kod_pocztowy_ojca,
          d.ulica_ojca,
          d.numer_domu_ojca,
          d.numer_lokalu_ojca || null,
          d.wojewodztwo_ojca,
          d.poczta_ojca,
          d.gmina_ojca,
          dane_ojca_id,
        ],
      );
    }

    await client.query(
      `UPDATE dane_osobowe
       SET imie=$1, nazwisko=$2, numer_tel=$3
       WHERE id=$4`,
      [d.imie_ojca, d.nazwisko_ojca, d.tel_ojca, dane_ojca_id],
    );

    // === Aktualizacja wyników ===
    await client.query(
      `UPDATE wyniki
       SET ocena_polski=$1, ocena_matematyka=$2, ocena_angielski=$3,
           egzamin_polski=$4, egzamin_matematyka=$5, egzamin_angielski=$6
       WHERE id=$7`,
      [
        d.ocena_polski,
        d.ocena_matematyka,
        d.ocena_angielski,
        d.egzamin_polski,
        d.egzamin_matematyka,
        d.egzamin_angielski,
        wynik_id,
      ],
    );

    // === Aktualizacja wniosku ===
    const wybraneKierunki = [d.kierunek_1, d.kierunek_2, d.kierunek_3].filter(
      (k) => k && k !== "",
    );

    // punkty można policzyć w backendzie analogicznie jak przy dodawaniu
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

    const ocenaDodatkowa = d.ocena_dodatkowa;
    if (ocenaDodatkowa == 6) punkty += 18;
    if (ocenaDodatkowa == 5) punkty += 17;
    if (ocenaDodatkowa == 4) punkty += 14;
    if (ocenaDodatkowa == 3) punkty += 8;
    if (ocenaDodatkowa == 2) punkty += 2;

    await client.query(
      `UPDATE wnioski
       SET szkola=$1, wiodacy_jezyk_obcy=$2, dodatkowy_jezyk_obcy=$3,
           pierwszy_wybor_szkoly=$4, swiadectwo_z_wyroznieniem=$5,
           ocena_dodatkowa=$6, punkty=$7,
           pierwszy_kierunek_id=$8, drugi_kierunek_id=$9, trzeci_kierunek_id=$10
       WHERE id=$11`,
      [
        d.szkola,
        d.wiodacy_jezyk_obcy_id,
        d.dodatkowy_jezyk_obcy || null,
        d.pierwszy_wybor_szkoly,
        d.swiadectwo_z_wyroznieniem,
        d.ocena_dodatkowa,
        Math.round(punkty),
        wybraneKierunki[0] || null,
        wybraneKierunki[1] || null,
        wybraneKierunki[2] || null,
        wniosekId,
      ],
    );

    await client.query("COMMIT");
    res.json({ success: true });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ error: "Błąd aktualizacji danych" });
  } finally {
    client.release();
  }
});

module.exports = router;
