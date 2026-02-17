import React, { useEffect, useState } from "react";
import axios from "axios";

function Strona5({
  dalej,
  wstecz,
  formDane,
  setFormDane,
  wyslijFormularz,
  ladowanie,
}) {
  const [kierunki, setKierunki] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/kierunki")
      .then((res) => {
        setKierunki(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const dodatkowePrzedmioty = () => {
    const wybrane = [
      formDane.kierunek_1,
      formDane.kierunek_2,
      formDane.kierunek_3,
    ];
    const przedmioty = kierunki
      .filter((k) => wybrane.includes(k.id.toString()))
      .map((k) => k.przedmiot)
      .filter(Boolean);
    return przedmioty.slice(0, 3);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        wyslijFormularz();
      }}
    >
      <div className="mb-3">
        <label htmlFor="kierunek_1">Wybierz kierunek</label>
        <select
          className="form-select mb-3"
          id="kierunek_1"
          value={formDane.kierunek_1}
          onChange={(e) =>
            setFormDane({
              ...formDane,
              kierunek_1: e.target.value,
              ilosc_kierunkow: 1,
            })
          }
          required
        >
          <option value="" hidden>
            Wybierz
          </option>
          {kierunki
            .filter((k) => k.szkola == formDane.szkola)
            .map((k) => (
              <option key={k.id} value={k.id}>
                {k.nazwa}
              </option>
            ))}
        </select>
      </div>
      {formDane.ilosc_kierunkow >= 1 && (
        <div className="mb-3">
          <label htmlFor="kierunek_2">Wybierz drugi kierunek</label>
          <select
            className="form-select mb-3"
            id="kierunek_2"
            value={formDane.kierunek_2}
            onChange={(e) =>
              setFormDane({
                ...formDane,
                kierunek_2: e.target.value,
                ilosc_kierunkow: 2,
              })
            }
          >
            {formDane.kierunek_3 == "" && <option value="">Brak</option>}
            {kierunki
              .filter((k) => k.szkola == formDane.szkola)
              .map((k) => (
                <option key={k.id} value={k.id}>
                  {k.nazwa}
                </option>
              ))}
          </select>
        </div>
      )}
      {formDane.ilosc_kierunkow >= 2 &&
        formDane.szkola == "LO" &&
        formDane.kierunek_2 != "" && (
          <div className="mb-3">
            <label htmlFor="kierunek_3">Wybierz trzeci kierunek</label>
            <select
              className="form-select mb-3"
              id="kierunek_3"
              value={formDane.kierunek_3}
              onChange={(e) =>
                setFormDane({
                  ...formDane,
                  kierunek_3: e.target.value,
                  ilosc_kierunkow: 3,
                })
              }
            >
              <option value="">Brak</option>
              {kierunki
                .filter((k) => k.szkola == formDane.szkola)
                .map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.nazwa}
                  </option>
                ))}
            </select>
          </div>
        )}

      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="pierwszy_wybor"
          checked={formDane.pierwszy_wybor_szkoly}
          onChange={(e) =>
            setFormDane({
              ...formDane,
              pierwszy_wybor_szkoly: e.target.checked,
            })
          }
        />
        <label className="form-check-label" htmlFor="pierwszy_wybor">
          Czy ta szkoła jest pierwszym wyborem?
        </label>
      </div>
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="swiadectwo_z_wyroznieniem"
          checked={formDane.swiadectwo_z_wyroznieniem}
          onChange={(e) =>
            setFormDane({
              ...formDane,
              swiadectwo_z_wyroznieniem: e.target.checked,
            })
          }
        />
        <label className="form-check-label" htmlFor="swiadectwo_z_wyroznieniem">
          Świadectwo z wyróżnieniem
        </label>
      </div>

      <div className="container col-10 mb-3">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Ocena</th>
              <th scope="col">Wynik z egzaminu ósmoklasity(%)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Język polski</th>
              <td>
                <input
                  type="number"
                  className="form-control"
                  required
                  min="1"
                  max="6"
                  value={formDane.ocena_polski}
                  onChange={(e) =>
                    setFormDane({
                      ...formDane,
                      ocena_polski: e.target.value,
                    })
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  required
                  min={0}
                  max={100}
                  value={formDane.egzamin_polski}
                  onChange={(e) =>
                    setFormDane({
                      ...formDane,
                      egzamin_polski: e.target.value,
                    })
                  }
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Matematyka</th>
              <td>
                <input
                  type="number"
                  className="form-control"
                  required
                  min={1}
                  max={6}
                  value={formDane.ocena_matematyka}
                  onChange={(e) =>
                    setFormDane({
                      ...formDane,
                      ocena_matematyka: e.target.value,
                    })
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  required
                  min={0}
                  max={100}
                  value={formDane.egzamin_matematyka}
                  onChange={(e) =>
                    setFormDane({
                      ...formDane,
                      egzamin_matematyka: e.target.value,
                    })
                  }
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Język angielski</th>
              <td>
                <input
                  type="number"
                  className="form-control"
                  required
                  min={1}
                  max={6}
                  value={formDane.ocena_angielski}
                  onChange={(e) =>
                    setFormDane({
                      ...formDane,
                      ocena_angielski: e.target.value,
                    })
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  required
                  min={0}
                  max={100}
                  value={formDane.egzamin_angielski}
                  onChange={(e) =>
                    setFormDane({
                      ...formDane,
                      egzamin_angielski: e.target.value,
                    })
                  }
                />
              </td>
            </tr>
            {dodatkowePrzedmioty().map((przedmiot, id) => (
              <tr key={`dodatkowy_przedmiot_${id + 1}`}>
                <th>{przedmiot}</th>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    required
                    min={1}
                    max={6}
                    value={formDane[`dodatkowy_przedmiot_${id + 1}_ocena`]}
                    onChange={(e) =>
                      setFormDane({
                        ...formDane,
                        [`dodatkowy_przedmiot_${id + 1}_ocena`]: e.target.value,
                      })
                    }
                  />
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <label htmlFor="wiodacy_jezyk_obcy">Wiodący język obcy</label>
      <select
        className="form-select mb-3"
        id="wiodacy_jezyk_obcy"
        value={formDane.wiodacy_jezyk_obcy_id}
        onChange={(e) =>
          setFormDane({
            ...formDane,
            wiodacy_jezyk_obcy_id: e.target.value,
          })
        }
        required
      >
        <option value="angielski">Angielski</option>
        <option value="niemiecki">Niemiecki</option>
        <option value="francuski">Francuski</option>
        <option value="hiszpanski">Hiszpański</option>
        <option value="rosyjski">Rosyjski</option>
        <option value="wloski">Włoski</option>
      </select>

      <label htmlFor="dodatkowy_jezyk_obcy">Dodatkowy język obcy</label>
      <select
        className="form-select mb-3"
        id="dodatkowy_jezyk_obcy"
        value={formDane.dodatkowy_jezyk_obcy}
        onChange={(e) =>
          setFormDane({
            ...formDane,
            dodatkowy_jezyk_obcy: e.target.value,
          })
        }
        required
      >
        <option value="" hidden>
          Wybierz
        </option>
        {formDane.szkola == "LO" ? (
          <>
            <option value="niemiecki">Niemiecki</option>
            <option value="francuski">Francuski</option>
            <option value="hiszpanski">Hiszpański</option>
            <option value="rosyjski">Rosyjski</option>
            <option value="wloski">Włoski</option>
          </>
        ) : (
          <>
            <option value="niemiecki">Niemiecki</option>
            <option value="francuski">Francuski</option>
            <option value="hiszpanski">Hiszpański</option>
          </>
        )}
      </select>

      <div className="przyciski">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => wstecz()}
        >
          Wstecz
        </button>
        {ladowanie ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <button
            type="submit"
            className="btn btn-success"
            // onClick={(e) => {
            //   e.target.disabled = true;
            //   wyslijFormularz();
            // }}
          >
            Zapisz
          </button>
        )}
      </div>
    </form>
  );
}

export default Strona5;
