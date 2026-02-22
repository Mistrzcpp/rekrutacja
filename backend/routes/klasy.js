const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/klasy", async (req, res) => {
  const client = await pool.connect();

  try {
    const { klasy } = req.body;
    if (!klasy) {
      return res.status(400).json({ error: "Brak danych klas" });
    }

    const { rows: kandydaci } = await client.query(`
     SELECT 
     k.id as kandydat_id, 
     t.imie, 
     t.nazwisko, 
     t.pesel, 
     w.punkty, 
     w.pierwszy_kierunek_id as kierunek_id, 
     k2.nazwa,
     w.pierwszy_wybor_szkoly as pierwszy_wybor,
     w.oryginal_swiadectwa as oryginal 
     FROM wnioski w 
     JOIN kandydaci k ON w.kandydat_id = k.id 
     join dane_osobowe t on K.dane_osobowe_id = T.id 
     join kierunki k2 on w.pierwszy_kierunek_id = k2.id 
     ORDER BY w.punkty DESC
    `);

    const przydzial = {};
    const pozostali = [];

    for (const id in klasy) {
      przydzial[id] = [];
    }

    for (const kandydat of kandydaci) {
      const kierunek = kandydat.kierunek_id;

      if (
        kierunek &&
        przydzial[kierunek] &&
        przydzial[kierunek].length < klasy[kierunek]
      ) {
        przydzial[kierunek].push({
          id: kandydat.kandydat_id,
          imie: kandydat.imie,
          nazwisko: kandydat.nazwisko,
          pesel: kandydat.pesel,
          punkty: kandydat.punkty,
        });
      } else {
        pozostali.push({
          id: kandydat.kandydat_id,
          imie: kandydat.imie,
          nazwisko: kandydat.nazwisko,
          pesel: kandydat.pesel,
          nazwa: kandydat.nazwa,
          punkty: kandydat.punkty,
          pierwszy_wybor: kandydat.pierwszy_wybor,
          oryginal: kandydat.oryginal,
        });
      }
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
