const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/kierunki", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM kierunki");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Błąd serwera" });
  }
});

module.exports = router;
