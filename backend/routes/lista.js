const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/lista", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT d_kandydat.imie AS k_imie, d_kandydat.drugie_imie AS k_drugie_imie, d_kandydat.nazwisko AS k_nazwisko, d_kandydat.email AS k_email, d_kandydat.numer_tel AS k_telefon, d_kandydat.pesel AS k_pesel, d_kandydat.data_urodzenia AS k_data_urodzenia, d_kandydat.miejsce_urodzenia AS k_miejsce_urodzenia, d_ojciec.imie AS ojciec_imie, d_ojciec.nazwisko AS ojciec_nazwisko, d_ojciec.numer_tel AS ojciec_telefon, d_matka.imie AS matka_imie, d_matka.nazwisko AS matka_nazwisko, d_matka.numer_tel AS matka_telefon, a.miejscowosc AS adres_miejscowosc, a.kod_pocztowy AS adres_kod_pocztowy, a.ulica AS adres_ulica, a.nr_domu AS adres_nr_domu, a.nr_lokalu AS adres_nr_lokalu, a.wojewodztwo AS adres_wojewodztwo, a.poczta AS adres_poczta, a.gmina AS adres_gmina, wy_kandydat.ocena_polski AS k_ocena_polski, wy_kandydat.ocena_matematyka AS k_ocena_matematyka, wy_kandydat.ocena_angielski AS k_ocena_angielski, wy_kandydat.egzamin_polski AS k_egzamin_polski, wy_kandydat.egzamin_matematyka AS k_egzamin_matematyka, wy_kandydat.egzamin_angielski AS k_egzamin_angielski, wy_wniosek.ocena_polski AS w_ocena_polski, wy_wniosek.ocena_matematyka AS w_ocena_matematyka, wy_wniosek.ocena_angielski AS w_ocena_angielski, wy_wniosek.egzamin_polski AS w_egzamin_polski, wy_wniosek.egzamin_matematyka AS w_egzamin_matematyka, wy_wniosek.egzamin_angielski AS w_egzamin_angielski, w.id AS wniosek_id, w.data AS w_data, w.szkola AS w_szkola, w.punkty AS w_punkty, w.miejsce_w_rankingu AS w_miejsce_w_rankingu, w.wiodacy_jezyk_obcy AS w_wiodacy_jezyk, w.dodatkowy_jezyk_obcy AS w_dodatkowy_jezyk, w.pierwszy_wybor_szkoly AS w_pierwszy_wybor, w.ktory_wybor_kierunku AS w_ktory_wybor, w.ocena_dodatkowa AS w_ocena_dodatkowa, w.swiadectwo_z_wyroznieniem AS w_wyroznienie, ki.id AS kierunek_id, ki.nazwa AS kierunek_nazwa, ki.szkola AS kierunek_szkola, ki.przedmiot AS kierunek_przedmiot FROM wnioski w JOIN kandydaci k ON w.kandydat_id = k.id JOIN dane_osobowe d_kandydat ON k.dane_osobowe_id = d_kandydat.id JOIN dane_osobowe d_ojciec ON k.dane_ojca_id = d_ojciec.id JOIN dane_osobowe d_matka ON k.dane_matki_id = d_matka.id JOIN adresy a ON d_kandydat.adres_id = a.id JOIN wyniki wy_kandydat ON k.wynik_id = wy_kandydat.id JOIN wyniki wy_wniosek ON w.wynik_id = wy_wniosek.id JOIN kierunki ki ON w.kierunek_id = ki.id;",
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Błąd serwera" });
  }
});

module.exports = router;
