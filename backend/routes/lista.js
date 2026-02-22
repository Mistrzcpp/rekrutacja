const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/lista", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT w.id as wniosek_id, d_kandydat.imie AS k_imie, d_kandydat.drugie_imie AS k_drugie_imie, d_kandydat.nazwisko AS k_nazwisko, d_kandydat.email AS k_email, d_kandydat.numer_tel AS k_telefon, d_kandydat.pesel AS k_pesel, d_kandydat.data_urodzenia AS k_data_urodzenia, d_kandydat.miejsce_urodzenia AS k_miejsce_urodzenia, d_ojciec.imie AS ojciec_imie, d_ojciec.nazwisko AS ojciec_nazwisko, d_ojciec.numer_tel AS ojciec_telefon, d_matka.imie AS matka_imie, d_matka.nazwisko AS matka_nazwisko, d_matka.numer_tel AS matka_telefon, a.miejscowosc AS adres_miejscowosc, a.kod_pocztowy AS adres_kod_pocztowy, a.ulica AS adres_ulica, a.nr_domu AS adres_nr_domu, a.nr_lokalu AS adres_nr_lokalu, a.wojewodztwo AS adres_wojewodztwo, a.poczta AS adres_poczta, a.gmina AS adres_gmina, wy_kandydat.ocena_polski AS k_ocena_polski, wy_kandydat.ocena_matematyka AS k_ocena_matematyka, wy_kandydat.ocena_angielski AS k_ocena_angielski, wy_kandydat.egzamin_polski AS k_egzamin_polski, wy_kandydat.egzamin_matematyka AS k_egzamin_matematyka, wy_kandydat.egzamin_angielski AS k_egzamin_angielski, w.id AS wniosek_id, w.data AS w_data, w.szkola AS w_szkola, w.punkty AS w_punkty, w.wiodacy_jezyk_obcy AS w_wiodacy_jezyk, w.dodatkowy_jezyk_obcy AS w_dodatkowy_jezyk, w.pierwszy_wybor_szkoly AS w_pierwszy_wybor, w.ocena_dodatkowa AS w_ocena_dodatkowa, w.swiadectwo_z_wyroznieniem AS w_wyroznienie, w.oryginal_swiadectwa  as w_oryginal, ki1.id AS kierunek_1_id, ki1.nazwa AS kierunek_1_nazwa, ki1.szkola AS kierunek_1_szkola, ki1.przedmiot AS kierunek_1_przedmiot, ki2.id AS kierunek_2_id, ki2.nazwa AS kierunek_2_nazwa, ki2.szkola AS kierunek_2_szkola, ki2.przedmiot AS kierunek_2_przedmiot, ki3.id AS kierunek_3_id, ki3.nazwa AS kierunek_3_nazwa, ki3.szkola AS kierunek_3_szkola, ki3.przedmiot AS kierunek_3_przedmiot FROM wnioski w JOIN kandydaci k ON w.kandydat_id = k.id JOIN dane_osobowe d_kandydat ON k.dane_osobowe_id = d_kandydat.id JOIN dane_osobowe d_ojciec ON k.dane_ojca_id = d_ojciec.id JOIN dane_osobowe d_matka ON k.dane_matki_id = d_matka.id JOIN adresy a ON d_kandydat.adres_id = a.id JOIN wyniki wy_kandydat ON k.wynik_id = wy_kandydat.id LEFT JOIN kierunki ki1 ON w.pierwszy_kierunek_id = ki1.id LEFT JOIN kierunki ki2 ON w.drugi_kierunek_id = ki2.id LEFT JOIN kierunki ki3 ON w.trzeci_kierunek_id = ki3.id;",
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Błąd serwera" });
  }
});

module.exports = router;
