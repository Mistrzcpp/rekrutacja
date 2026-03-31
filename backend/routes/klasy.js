const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/klasy", async (req, res) => {
  const client = await pool.connect();

  try {
    const { klasy } = req.body;
    if (!klasy) return res.status(400).json({ error: "Brak danych klas" });

    const { rows: kandydaci } = await client.query(`
       SELECT 
        k.id as kandydat_id,
        t.imie,
        t.nazwisko,
        t.pesel,
        w.punkty,
        w.pierwszy_kierunek_id,
        ki.nazwa as k1,
        w.drugi_kierunek_id,
        ki2.nazwa as k2,
        w.trzeci_kierunek_id,
        ki3.nazwa as k3,
        t2.numer_tel,
        w.pierwszy_wybor_szkoly as pierwszy_wybor,
        w.oryginal_swiadectwa  as oryginal
      FROM wnioski w
      JOIN kandydaci k ON w.kandydat_id = k.id
      JOIN dane_osobowe t ON k.dane_osobowe_id = t.id
      join dane_osobowe t2 on k.dane_matki_id = t2.id 
      join kierunki ki on w.pierwszy_kierunek_id = ki.id 
      join kierunki ki2 on w.drugi_kierunek_id  = ki2.id 
      join kierunki ki3 on w.trzeci_kierunek_id  = ki3.id 
      ORDER BY w.punkty DESC
    `);

    // inicjalizacja przydziału
    const przydzial = {};
    for (const id in klasy) {
      przydzial[id] = [];
    }

    // dodajemy pole kontrolne do każdego kandydata
    const kandydaciQueue = kandydaci.map((k) => ({
      ...k,
      currentPreferenceIndex: 0,
    }));

    function przydziel(kandydat) {
      const preferencje = [
        kandydat.pierwszy_kierunek_id,
        kandydat.drugi_kierunek_id,
        kandydat.trzeci_kierunek_id,
      ];

      while (kandydat.currentPreferenceIndex < preferencje.length) {
        const kierunekId = preferencje[kandydat.currentPreferenceIndex];
        kandydat.wybor = kandydat.currentPreferenceIndex + 1;

        if (!kierunekId || !klasy[kierunekId]) {
          kandydat.currentPreferenceIndex++;
          continue;
        }

        const lista = przydzial[kierunekId];
        const capacity = klasy[kierunekId];

        // wolne miejsce
        if (lista.length < capacity) {
          lista.push({ ...kandydat });
          return true;
        }

        // szukamy najsłabszego
        let minIndex = 0;
        for (let i = 1; i < lista.length; i++) {
          if (lista[i].punkty < lista[minIndex].punkty) {
            minIndex = i;
          }
        }

        const najslabszy = lista[minIndex];

        if (kandydat.punkty > najslabszy.punkty) {
          // wyrzucamy najsłabszego
          lista[minIndex] = { ...kandydat };

          // zwiększamy preferencję wyrzuconemu
          najslabszy.currentPreferenceIndex++;

          // próbujemy go przydzielić dalej
          return przydziel(najslabszy);
        }

        // jeśli nie ma więcej punktów → próbuje dalej
        kandydat.currentPreferenceIndex++;
      }

      return false;
    }

    const pozostali = [];

    for (const kandydat of kandydaciQueue) {
      const przydzielono = przydziel(kandydat);
      if (!przydzielono) pozostali.push(kandydat);
    }

    res.json({ przydzial, pozostali });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Błąd przydziału" });
  } finally {
    client.release();
  }
});
module.exports = router;
