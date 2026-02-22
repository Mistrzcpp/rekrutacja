import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SzczegolyWniosku from "./SzczegolyWniosku";

function Lista({ setFormDane, setEdytuj }) {
  const navigate = useNavigate();
  const [lista, setLista] = useState([]);
  const [ladowanie, setLadowanie] = useState(true);
  const [szkola, setSzkola] = useState("Wszystkie");
  const [kierunki, setKierunki] = useState([]);
  const [selectedKierunki, setSelectedKierunki] = useState([]);
  const [search, setSearch] = useState("");

  // Pobieranie kandydatów
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/lista")
      .then((res) => {
        setLista(res.data);
        setLadowanie(false);
      })
      .catch((err) => console.error(err));
  }, []);

  // Pobieranie kierunków
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/kierunki")
      .then((res) => setKierunki(res.data))
      .catch((err) => console.error(err));
  }, []);

  const toggleKierunek = (k) => {
    setSelectedKierunki((prev) =>
      prev.includes(k.id)
        ? prev.filter((item) => item !== k.id)
        : [...prev, k.id],
    );
  };

  const filtrLista = lista.filter((item) => {
    const szkolaMatch = szkola === "Wszystkie" || item.w_szkola === szkola;

    const kierunekMatch =
      selectedKierunki.length === 0 ||
      selectedKierunki.some((kId) =>
        [
          item.kierunek_1_id /*, item.kierunek_2_id, item.kierunek_3_id*/,
        ].includes(kId),
      );

    const searchLower = search.toLowerCase();
    const searchMatch =
      search.trim() === "" ||
      [
        item.k_imie,
        item.k_drugie_imie,
        item.k_nazwisko,
        item.k_pesel,
        item.k_email,
        item.k_data_urodzenia,
        item.k_miejsce_urodzenia,
        item.adres_miejscowosc,
        item.adres_kod_pocztowy,
        item.adres_ulica,
        item.adres_nr_domu,
        item.adres_nr_lokalu,
        item.adres_wojewodztwo,
        item.adres_poczta,
        item.adres_gmina,
        item.k_ocena_polski,
        item.k_ocena_matematyka,
        item.k_ocena_angielski,
        item.k_egzamin_polski,
        item.k_egzamin_matematyka,
        item.k_egzamin_angielski,
        item.w_data,
        item.w_szkola,
        item.kierunek_1_nazwa,
        item.kierunek_2_nazwa,
        item.kierunek_3_nazwa,
        item.w_punkty,
        item.w_pierwszy_wybor ? "tak" : "nie",
        item.w_wyroznienie ? "tak" : "nie",
        item.w_wiodacy_jezyk,
        item.w_dodatkowy_jezyk,
      ]
        .filter(Boolean)
        .some((field) => field.toString().toLowerCase().includes(searchLower));

    return szkolaMatch && kierunekMatch && searchMatch;
  });

  const filtrKierunki =
    szkola === "Wszystkie"
      ? kierunki
      : kierunki.filter((k) => k.szkola === szkola);

  const handleEdit = (item) => {
    // ustaw stan formularza w rodzicu
    setFormDane({
      ...item, // podstawiamy wszystkie dane z wybranego kandydata
      kierunek_1: item.kierunek_1_id || "",
      kierunek_2: item.kierunek_2_id || "",
      kierunek_3: item.kierunek_3_id || "",
    });
    setEdytuj(true); // np. w rodzicu pokazuje formularz zamiast listy
    window.scrollTo(0, 0); // przewinięcie do góry
  };

  if (ladowanie) {
    return (
      <div className="d-flex justify-content-center mt-3">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        className="btn-close my-3 ms-3"
        aria-label="Close"
        title="Wyjdź"
        onClick={() => navigate("/")}
      ></button>
      <div className="container mt-4">
        <h2>Kandydaci</h2>
        <div className="row">
          {/* PANEL FILTRÓW */}
          <div className="col-md-3 mb-4">
            <div className="card p-3 shadow-sm">
              <h5>Filtruj</h5>
              <div className="mb-3">
                <label className="form-label">Szkoła:</label>
                <select
                  className="form-select"
                  value={szkola}
                  onChange={(e) => {
                    setSzkola(e.target.value);
                    setSelectedKierunki([]);
                  }}
                >
                  <option value="Wszystkie">Wszystkie</option>
                  <option value="LO">LO</option>
                  <option value="TIE">TIE</option>
                </select>
              </div>
              <div>
                <label className="form-label">Kierunki:</label>
                <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                  {filtrKierunki.map((k) => (
                    <div key={k.id} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`kierunek-${k.id}`}
                        checked={selectedKierunki.includes(k.id)}
                        onChange={() => toggleKierunek(k)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`kierunek-${k.id}`}
                      >
                        {k.nazwa}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* LISTA KANDYDATÓW */}
          <div className="col-md-9">
            <div className="input-group mb-3">
              <input
                type="search"
                className="form-control py-2"
                placeholder="Szukaj..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="accordion">
              {filtrLista.map((item, index) => (
                <div className="accordion-item mb-3 shadow-sm" key={index}>
                  <h2 className="accordion-header d-flex justify-content-between align-items-center">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse-${index}`}
                    >
                      {item.k_imie} {item.k_drugie_imie} {item.k_nazwisko} —{" "}
                      {item.kierunek_1_nazwa}
                    </button>
                  </h2>

                  <div
                    id={`collapse-${index}`}
                    className="accordion-collapse collapse"
                  >
                    <div className="accordion-body">
                      <SzczegolyWniosku dane={item} />
                    </div>
                    {/* PRZYCISK EDYCJI */}
                    <button
                      className="btn btn-sm btn-primary ms-3 mb-3"
                      onClick={() => handleEdit(item)}
                    >
                      Edytuj
                    </button>
                  </div>
                </div>
              ))}

              {filtrLista.length === 0 && (
                <p>Brak wyników dla wybranych filtrów</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Lista;
