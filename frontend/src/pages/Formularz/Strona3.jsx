import React, { useState } from "react";

function Strona3({ dalej, wstecz, formDane, setFormDane }) {
  const [inny_adres_matki, setAdresMatkiInny] = useState(false);
  const [inny_adres_ojca, setAdresOjcaInny] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dalej();
      }}
    >
      <div className="mb-3">
        <label className="form-label">Imię matki</label>
        <input
          type="text"
          className="form-control"
          value={formDane.imie_matki}
          onChange={(e) =>
            setFormDane({ ...formDane, imie_matki: e.target.value })
          }
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Nazwisko matki</label>
        <input
          type="text"
          className="form-control"
          value={formDane.nazwisko_matki}
          onChange={(e) =>
            setFormDane({ ...formDane, nazwisko_matki: e.target.value })
          }
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Numer telefonu matki</label>
        <input
          type="tel"
          className="form-control"
          value={formDane.tel_matki}
          onChange={(e) =>
            setFormDane({ ...formDane, tel_matki: e.target.value })
          }
          required
        />
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="inny_adres_matki"
          checked={formDane.inny_adres_matki}
          onChange={(e) => {
            setAdresMatkiInny(e.target.checked);
            setFormDane({ ...formDane, inny_adres_matki: e.target.checked });
          }}
        />
        <label className="form-check-label mb-3" htmlFor="inny_adres_matki">
          Adres zamieszkania matki inny niż kandydata
        </label>
      </div>

      {formDane.inny_adres_matki && (
        <>
          <div className="container col-6">
            <div className="mb-3">
              <label className="form-label">Miejscowość</label>
              <input
                type="text"
                className="form-control"
                value={formDane.miejscowosc_matki}
                onChange={(e) =>
                  setFormDane({
                    ...formDane,
                    miejscowosc_matki: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Ulica</label>
              <input
                type="text"
                className="form-control"
                value={formDane.ulica_matki}
                onChange={(e) =>
                  setFormDane({ ...formDane, ulica_matki: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Numer domu</label>
              <input
                type="text"
                className="form-control"
                value={formDane.numer_domu_matki}
                onChange={(e) =>
                  setFormDane({ ...formDane, numer_domu_matki: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Numer lokalu</label>
              <input
                type="text"
                className="form-control"
                value={formDane.numer_lokalu_matki}
                onChange={(e) =>
                  setFormDane({
                    ...formDane,
                    numer_lokalu_matki: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Kod pocztowy</label>
              <input
                type="text"
                className="form-control"
                value={formDane.kod_pocztowy_matki}
                onChange={(e) =>
                  setFormDane({
                    ...formDane,
                    kod_pocztowy_matki: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Gmina</label>
              <input
                type="text"
                className="form-control"
                value={formDane.gmina_matki}
                onChange={(e) =>
                  setFormDane({ ...formDane, gmina_matki: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Poczta</label>
              <input
                type="text"
                className="form-control"
                value={formDane.poczta_matki}
                onChange={(e) =>
                  setFormDane({ ...formDane, poczta_matki: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Województwo</label>
              <select
                className="form-select"
                value={formDane.wojewodztwo_matki}
                onChange={(e) =>
                  setFormDane({
                    ...formDane,
                    wojewodztwo_matki: e.target.value,
                  })
                }
              >
                <option value="" hidden>
                  Wybierz województwo
                </option>
                <option value="dolnośląskie">Dolnośląskie</option>
                <option value="kujawsko-pomorskie">Kujawsko-pomorskie</option>
                <option value="lubelskie">Lubelskie</option>
                <option value="lubuskie">Lubuskie</option>
                <option value="łódzkie">Łódzkie</option>
                <option value="małopolskie">Małopolskie</option>
                <option value="mazowieckie">Mazowieckie</option>
                <option value="opolskie">Opolskie</option>
                <option value="podkarpackie">Podkarpackie</option>
                <option value="podlaskie">Podlaskie</option>
                <option value="pomorskie">Pomorskie</option>
                <option value="śląskie">Śląskie</option>
                <option value="świętokrzyskie">Świętokrzyskie</option>
                <option value="warmińsko-mazurskie">Warmińsko-mazurskie</option>
                <option value="wielkopolskie">Wielkopolskie</option>
                <option value="zachodniopomorskie">Zachodniopomorskie</option>
              </select>
            </div>
          </div>
        </>
      )}

      <div className="mb-3">
        <label className="form-label">Imię ojca</label>
        <input
          type="text"
          className="form-control"
          required
          value={formDane.imie_ojca}
          onChange={(e) =>
            setFormDane({ ...formDane, imie_ojca: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Nazwisko ojca</label>
        <input
          type="text"
          className="form-control"
          required
          value={formDane.nazwisko_ojca}
          onChange={(e) =>
            setFormDane({ ...formDane, nazwisko_ojca: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Numer telefonu ojca</label>
        <input
          type="tel"
          className="form-control"
          required
          value={formDane.tel_ojca}
          onChange={(e) =>
            setFormDane({ ...formDane, tel_ojca: e.target.value })
          }
        />
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="inny_adres_ojca"
          checked={formDane.inny_adres_ojca}
          onChange={(e) => {
            setAdresOjcaInny(e.target.checked);
            setFormDane({ ...formDane, inny_adres_ojca: e.target.checked });
          }}
        />
        <label className="form-check-label mb-3" htmlFor="inny_adres_ojca">
          Adres zamieszkania ojca inny niż kandydata
        </label>
      </div>

      {formDane.inny_adres_ojca && (
        <>
          <div className="container col-6">
            <div className="mb-3">
              <label className="form-label">Miejscowość</label>
              <input
                type="text"
                className="form-control"
                value={formDane.miejscowosc_ojca}
                onChange={(e) =>
                  setFormDane({ ...formDane, miejscowosc_ojca: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Ulica</label>
              <input
                type="text"
                className="form-control"
                value={formDane.ulica_ojca}
                onChange={(e) =>
                  setFormDane({ ...formDane, ulica_ojca: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Numer domu</label>
              <input
                type="text"
                className="form-control"
                value={formDane.numer_domu_ojca}
                onChange={(e) =>
                  setFormDane({ ...formDane, numer_domu_ojca: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Numer lokalu</label>
              <input
                type="text"
                className="form-control"
                value={formDane.numer_lokalu_ojca}
                onChange={(e) =>
                  setFormDane({
                    ...formDane,
                    numer_lokalu_ojca: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Kod pocztowy</label>
              <input
                type="text"
                className="form-control"
                value={formDane.kod_pocztowy_ojca}
                onChange={(e) =>
                  setFormDane({
                    ...formDane,
                    kod_pocztowy_ojca: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Gmina</label>
              <input
                type="text"
                className="form-control"
                value={formDane.gmina_ojca}
                onChange={(e) =>
                  setFormDane({ ...formDane, gmina_ojca: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Poczta</label>
              <input
                type="text"
                className="form-control"
                value={formDane.poczta_ojca}
                onChange={(e) =>
                  setFormDane({ ...formDane, poczta_ojca: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Województwo</label>
              <select
                className="form-select"
                value={formDane.wojewodztwo_ojca}
                onChange={(e) =>
                  setFormDane({ ...formDane, wojewodztwo_ojca: e.target.value })
                }
              >
                <option value="" hidden>
                  Wybierz województwo
                </option>
                <option value="dolnośląskie">Dolnośląskie</option>
                <option value="kujawsko-pomorskie">Kujawsko-pomorskie</option>
                <option value="lubelskie">Lubelskie</option>
                <option value="lubuskie">Lubuskie</option>
                <option value="łódzkie">Łódzkie</option>
                <option value="małopolskie">Małopolskie</option>
                <option value="mazowieckie">Mazowieckie</option>
                <option value="opolskie">Opolskie</option>
                <option value="podkarpackie">Podkarpackie</option>
                <option value="podlaskie">Podlaskie</option>
                <option value="pomorskie">Pomorskie</option>
                <option value="śląskie">Śląskie</option>
                <option value="świętokrzyskie">Świętokrzyskie</option>
                <option value="warmińsko-mazurskie">Warmińsko-mazurskie</option>
                <option value="wielkopolskie">Wielkopolskie</option>
                <option value="zachodniopomorskie">Zachodniopomorskie</option>
              </select>
            </div>
          </div>
        </>
      )}

      <div className="przyciski">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => wstecz()}
        >
          Wstecz
        </button>

        <button type="submit" className="btn btn-success">
          Dalej
        </button>
      </div>
    </form>
  );
}

export default Strona3;
