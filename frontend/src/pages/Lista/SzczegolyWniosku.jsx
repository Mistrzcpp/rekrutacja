import React from "react";

function SzczegolyWniosku({ dane }) {
  return (
    <div className="accordion accordion-flush" id="accordionWniosek">
      {/* DANE OSOBOWE */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingOne">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-daneOsobowe"
            aria-expanded="false"
            aria-controls="flush-daneOsobowe"
          >
            Dane osobowe
          </button>
        </h2>
        <div
          id="flush-daneOsobowe"
          className="accordion-collapse collapse"
          data-bs-parent="#accordionWniosek"
        >
          <div className="accordion-body">
            <p>
              <strong>Imię:</strong> {dane.k_imie}
            </p>
            <p>
              <strong>Drugie imię:</strong> {dane.k_drugie_imie}
            </p>
            <p>
              <strong>Nazwisko:</strong> {dane.k_nazwisko}
            </p>
            <p>
              <strong>PESEL:</strong> {dane.k_pesel}
            </p>
            <p>
              <strong>Email:</strong> {dane.k_email}
            </p>
            <p>
              <strong>Data urodzenia:</strong>{" "}
              {dane.k_data_urodzenia.slice(8, 10)}-
              {dane.k_data_urodzenia.slice(5, 7)}-
              {dane.k_data_urodzenia.slice(0, 4)}
            </p>

            <p>
              <strong>Miejsce urodzenia:</strong> {dane.k_miejsce_urodzenia}
            </p>
          </div>
        </div>
      </div>

      {/* ADRES */}
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-adres"
          >
            Adres
          </button>
        </h2>
        <div
          id="flush-adres"
          className="accordion-collapse collapse"
          data-bs-parent="#accordionWniosek"
        >
          <div className="accordion-body">
            <p>
              <strong>Miejscowość:</strong> {dane.adres_miejscowosc}
            </p>
            <p>
              <strong>Kod pocztowy:</strong> {dane.adres_kod_pocztowy}
            </p>
            <p>
              <strong>Ulica:</strong> {dane.adres_ulica}
            </p>
            <p>
              <strong>Nr domu:</strong> {dane.adres_nr_domu}
            </p>
            <p>
              <strong>Nr lokalu:</strong> {dane.adres_nr_lokalu}
            </p>
            <p>
              <strong>Województwo:</strong> {dane.adres_wojewodztwo}
            </p>
            <p>
              <strong>Poczta:</strong> {dane.adres_poczta}
            </p>
            <p>
              <strong>Gmina:</strong> {dane.adres_gmina}
            </p>
          </div>
        </div>
      </div>

      {/* WYNIKI */}
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-wyniki"
          >
            Wyniki
          </button>
        </h2>
        <div
          id="flush-wyniki"
          className="accordion-collapse collapse"
          data-bs-parent="#accordionWniosek"
        >
          <div className="accordion-body">
            <p>
              <strong>Ocena polski:</strong> {dane.k_ocena_polski}
            </p>
            <p>
              <strong>Ocena matematyka:</strong> {dane.k_ocena_matematyka}
            </p>
            <p>
              <strong>Ocena angielski:</strong> {dane.k_ocena_angielski}
            </p>
            <p>
              <strong>Egzamin polski:</strong> {dane.k_egzamin_polski}
            </p>
            <p>
              <strong>Egzamin matematyka:</strong> {dane.k_egzamin_matematyka}
            </p>
            <p>
              <strong>Egzamin angielski:</strong> {dane.k_egzamin_angielski}
            </p>
          </div>
        </div>
      </div>

      {/* WNIOSEK */}
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-wniosek"
          >
            Wniosek
          </button>
        </h2>
        <div
          id="flush-wniosek"
          className="accordion-collapse collapse"
          data-bs-parent="#accordionWniosek"
        >
          <div className="accordion-body">
            <p>
              <strong>Data złożenia:</strong> {dane.w_data.slice(8, 10)}-
              {dane.w_data.slice(5, 7)}-{dane.w_data.slice(0, 4)}
            </p>
            <p>
              <strong>Szkoła:</strong> {dane.w_szkola}
            </p>
            <p>
              <strong>Kierunek:</strong> {dane.kierunek_nazwa}
            </p>
            <p>
              <strong>Punkty:</strong> {dane.w_punkty}
            </p>
            <p>
              <strong>Pierwszy wybór:</strong>{" "}
              {dane.w_pierwszy_wybor ? "Tak" : "Nie"}
            </p>
            <p>
              <strong>Świadectwo z wyróżnieniem:</strong>{" "}
              {dane.w_wyroznienie ? "Tak" : "Nie"}
            </p>
            <p>
              <strong>Wiodący język obcy:</strong> {dane.w_wiodacy_jezyk}
            </p>
            <p>
              <strong>Dodatkowyy język obcy:</strong> {dane.w_dodatkowy_jezyk}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SzczegolyWniosku;
