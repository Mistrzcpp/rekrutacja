function Strona4({ dalej, wstecz }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dalej();
      }}
    >
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="wielodzietnosc_rodziny"
        />
        <label className="form-check-label" htmlFor="wielodzietnosc_rodziny">
          Wielodzietność rodziny
        </label>
      </div>

      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="niepelnosprawnosc"
        />
        <label className="form-check-label" htmlFor="niepelnosprawnosc">
          Niepelnosprawnosc kandydata
        </label>
      </div>

      <label htmlFor="niepelnosprawnosc_rodzicow">
        Niepełnosprawnośc rodziców
      </label>
      <select
        className="form-select mb-3"
        id="niepelnosprawnosc_rodzicow"
        defaultValue={0}
      >
        <option value="0">Brak</option>
        <option value="1">Niepelnosprawnosc jednego z rodzicow</option>
        <option value="2">Niepelnosprawnosc obojga z rodzicow</option>
      </select>

      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="samotne_wychowywanie"
        />
        <label className="form-check-label" htmlFor="samotne_wychowywanie">
          Samotne wychowywanie
        </label>
      </div>

      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="opieka_zastepcza"
        />
        <label className="form-check-label" htmlFor="opieka_zastepcza">
          Opieka zastępcza
        </label>
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

export default Strona4;
