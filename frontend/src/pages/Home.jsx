import dodaj from "../assets/dodaj.png";
import lista from "../assets/lista.png";
import klasy from "../assets/klasy.png";
import imp from "../assets/import.png";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="home">
      <div
        className="card home-card"
        style={{ width: "18rem" }}
        onClick={() => navigate("/formularz")}
      >
        <img src={dodaj} className="card-img-top" alt="lo" />
        <div className="card-body">
          <h5 className="card-title">Dodaj kandydata</h5>
          <p className="card-text">
            Wypełnij formularz i dodaj nowego kandydata
          </p>
        </div>
      </div>

      <div
        className="card home-card mx-3"
        style={{ width: "18rem" }}
        onClick={() => navigate("/lista")}
      >
        <img src={lista} className="card-img-top" alt="lo" />
        <div className="card-body">
          <h5 className="card-title">Pokaż listę kandytatów</h5>
          <p className="card-text">
            Pokaż wszystkich kandydatów, wyszukaj, edytuj dane
          </p>
        </div>
      </div>

      <div
        className="card home-card "
        style={{ width: "18rem" }}
        onClick={() => navigate("/klasy")}
      >
        <img src={klasy} className="card-img-top" alt="lo" />
        <div className="card-body">
          <h5 className="card-title">Utwórz klasy</h5>
          <p className="card-text">Utwórz klasy dla kierunków</p>
        </div>
      </div>

      <div
        className="card home-card mx-3"
        style={{ width: "18rem" }}
        onClick={() => navigate("/importuj")}
      >
        <img src={imp} className="card-img-top" alt="importuj" />
        <div className="card-body">
          <h5 className="card-title">Importuj dane</h5>
          <p className="card-text">Importuj dane w formacie csv</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
