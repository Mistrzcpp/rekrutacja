import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PrzydzialKlasy() {
  const navigate = useNavigate();
  const [liczebnosc, setLiczebnosc] = useState({});
  const [wynik, setWynik] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [kierunki, setKierunki] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/kierunki")
      .then((res) => setKierunki(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (id, value) => {
    setLiczebnosc((prev) => ({ ...prev, [id]: Number(value) }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setWynik(null);

    try {
      const res = await axios.post("http://localhost:5000/api/klasy", {
        klasy: liczebnosc,
      });
      setWynik(res.data);
    } catch (err) {
      console.error(err);
      setError("Błąd podczas przydziału");
    } finally {
      setLoading(false);
    }
  };

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
        <h2>Przydział klas</h2>

        {/* INPUTY W 3 KOLUMNACH */}
        <div className="mb-3">
          <div className="row">
            {kierunki.map((k) => (
              <div key={k.id} className="col-12 col-sm-6 col-md-4 mb-3">
                <label className="form-label">{k.nazwa}</label>
                <input
                  type="number"
                  min={0}
                  className="form-control"
                  value={liczebnosc[k.id] || ""}
                  onChange={(e) => handleChange(k.id, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          className="btn btn-primary mb-4"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Przydzielanie..." : "Przydziel kandydatów"}
        </button>

        {error && <div className="alert alert-danger">{error}</div>}

        {/* WYNIKI */}
        {wynik && (
          <div>
            <h3>Wyniki przydziału</h3>

            {/* ACCORDION KIERUNKÓW */}
            <div className="accordion" id="accordionWyniki">
              {Object.entries(wynik.przydzial).map(
                ([kierunekId, lista], index) => {
                  const nazwa =
                    kierunki.find((k) => k.id == kierunekId)?.nazwa ||
                    kierunekId;

                  return (
                    <div className="accordion-item" key={kierunekId}>
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${index}`}
                        >
                          {nazwa} ({lista.length})
                        </button>
                      </h2>

                      <div
                        id={`collapse${index}`}
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionWyniki"
                      >
                        <div className="accordion-body">
                          {lista.length === 0 ? (
                            <p>Brak przydzielonych kandydatów</p>
                          ) : (
                            <div className="table-responsive">
                              <table className="table table-sm table-striped">
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>Imię</th>
                                    <th>Nazwisko</th>
                                    <th>PESEL</th>
                                    <th>Punkty</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {lista.map((k, i) => (
                                    <tr key={k.id}>
                                      <td>{i + 1}</td>
                                      <td>{k.imie}</td>
                                      <td>{k.nazwisko}</td>
                                      <td>{k.pesel}</td>
                                      <td>
                                        <span className="badge bg-primary">
                                          {k.punkty}
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                },
              )}
            </div>

            {/* ACCORDION NIEPRZYDZIELONYCH */}
            {wynik.pozostali && wynik.pozostali.length > 0 && (
              <div className="accordion mt-4" id="accordionNieprzydzieleni">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed bg-warning text-white"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseNieprzydzieleni"
                    >
                      Nieprzydzieleni ({wynik.pozostali.length})
                    </button>
                  </h2>

                  <div
                    id="collapseNieprzydzieleni"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionNieprzydzieleni"
                  >
                    <div className="accordion-body">
                      <div className="table-responsive">
                        <table className="table table-sm table-striped">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Imię</th>
                              <th>Nazwisko</th>
                              <th>PESEL</th>
                              <th>Kierunek</th>
                              <th>Oryginał świadectwa</th>
                              <th>Pierwszy wybór szkoły</th>
                              <th>Punkty</th>
                            </tr>
                          </thead>
                          <tbody>
                            {wynik.pozostali.map((k, i) => (
                              <tr key={k.id}>
                                <td>{i + 1}</td>
                                <td>{k.imie}</td>
                                <td>{k.nazwisko}</td>
                                <td>{k.pesel}</td>
                                <td>{k.nazwa}</td>
                                <td>{k.oryginal ? "Tak" : "Nie"}</td>
                                <td>{k.pierwszy_wybor ? "Tak" : "Nie"}</td>
                                <td>
                                  <span className="badge bg-danger">
                                    {k.punkty}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
