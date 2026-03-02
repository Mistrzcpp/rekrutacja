const express = require("express");
const cors = require("cors");
const kierunkiRoutes = require("./routes/kierunki");
const dodaj = require("./routes/dodaj");
const lista = require("./routes/lista");
const edytuj = require("./routes/edytuj");
const klasy = require("./routes/klasy");
const importuj = require("./routes/importuj");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", kierunkiRoutes);
app.use("/api", dodaj);
app.use("/api", lista);
app.use("/api", klasy);
app.use("/api", edytuj);
app.use("/api", importuj);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
