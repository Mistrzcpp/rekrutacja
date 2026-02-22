import React from "react";

function Strona1({ dalej, formDane, setFormDane }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dalej();
      }}
    >
      <label className="form-label">Szkoła</label>
      <select
        className="form-select mb-3"
        id="szkola"
        value={formDane.szkola}
        onChange={(e) => setFormDane({ ...formDane, szkola: e.target.value })}
        required
      >
        <option value="" hidden>
          Wybierz szkołę
        </option>
        <option value="LO">Liceum</option>
        <option value="TIE">Technikum</option>
      </select>

      <div className="mb-3">
        <label className="form-label">Imię</label>
        <input
          type="text"
          className="form-control"
          value={formDane.imie}
          onChange={(e) => setFormDane({ ...formDane, imie: e.target.value })}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Drugie imię</label>
        <input
          type="text"
          className="form-control"
          value={formDane.drugie_imie}
          onChange={(e) =>
            setFormDane({ ...formDane, drugie_imie: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Nazwisko</label>
        <input
          type="text"
          className="form-control"
          value={formDane.nazwisko}
          onChange={(e) =>
            setFormDane({ ...formDane, nazwisko: e.target.value })
          }
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Pesel</label>
        <input
          type="text"
          className="form-control"
          maxLength={11}
          pattern="\d{11}"
          value={formDane.pesel}
          onChange={(e) => setFormDane({ ...formDane, pesel: e.target.value })}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">E-mail</label>
        <input
          type="email"
          className="form-control"
          value={formDane.email}
          onChange={(e) => setFormDane({ ...formDane, email: e.target.value })}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Data urodzenia</label>
        <input
          type="date"
          className="form-control"
          value={formDane.data_urodzenia}
          onChange={(e) =>
            setFormDane({ ...formDane, data_urodzenia: e.target.value })
          }
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Miejsce urodzenia</label>
        <input
          type="text"
          className="form-control"
          value={formDane.miejsce_urodzenia}
          onChange={(e) =>
            setFormDane({ ...formDane, miejsce_urodzenia: e.target.value })
          }
          required
        />
      </div>

      <div className="przyciski justify-content-end">
        <button type="submit" className="btn btn-success">
          Dalej
        </button>
      </div>
    </form>
  );
}

export default Strona1;
