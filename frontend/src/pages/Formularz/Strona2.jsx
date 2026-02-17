import React from "react";

function Strona2({ dalej, wstecz, formDane, setFormDane }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dalej();
      }}
    >
      <div className="mb-3">
        <label className="form-label">Miejscowość</label>
        <input
          type="text"
          className="form-control"
          value={formDane.miejscowosc}
          onChange={(e) =>
            setFormDane({ ...formDane, miejscowosc: e.target.value })
          }
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Ulica</label>
        <input
          type="text"
          className="form-control"
          value={formDane.ulica}
          onChange={(e) => setFormDane({ ...formDane, ulica: e.target.value })}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Numer domu</label>
        <input
          type="text"
          className="form-control"
          value={formDane.numer_domu}
          onChange={(e) =>
            setFormDane({ ...formDane, numer_domu: e.target.value })
          }
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Numer lokalu</label>
        <input
          type="text"
          className="form-control"
          value={formDane.numer_lokalu}
          onChange={(e) =>
            setFormDane({ ...formDane, numer_lokalu: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Kod pocztowy</label>
        <input
          type="text"
          className="form-control"
          maxLength={6}
          value={formDane.kod_pocztowy}
          onChange={(e) =>
            setFormDane({ ...formDane, kod_pocztowy: e.target.value })
          }
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Gmina</label>
        <input
          type="text"
          className="form-control"
          value={formDane.gmina}
          onChange={(e) => setFormDane({ ...formDane, gmina: e.target.value })}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Poczta</label>
        <input
          type="text"
          className="form-control"
          value={formDane.poczta}
          onChange={(e) => setFormDane({ ...formDane, poczta: e.target.value })}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Województwo</label>
        <select
          className="form-select"
          value={formDane.wojewodztwo}
          onChange={(e) =>
            setFormDane({ ...formDane, wojewodztwo: e.target.value })
          }
          required
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

export default Strona2;
