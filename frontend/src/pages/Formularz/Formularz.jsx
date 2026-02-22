import ProgressBar from "./ProgressBar";
import Strona1 from "./Strona1";
import Strona2 from "./Strona2";
import Strona3 from "./Strona3";
import Strona4 from "./Strona4";
import Strona5 from "./Strona5";
import formDaneInit from "./formDaneInit";
import "./Formularz.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { mapApiToForm } from "../../map/mappers";

function Formularz({ dane, edytuj }) {
  const navigate = useNavigate();
  const [strona, setStrona] = useState(1);
  const [formDane, setFormDane] = useState(formDaneInit);
  const [ladowanie, setLadowanie] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const dalej = () => setStrona((s) => Math.min(s + 1, 5));
  const wstecz = () => setStrona((s) => Math.max(s - 1, 1));

  useEffect(() => {
    if (dane) {
      setFormDane(mapApiToForm(dane));
    }
  }, [dane]);

  const wyslijFormularz = async () => {
    setLadowanie(true);
    //console.log(formDane);
    if (edytuj) {
      const id = formDane.wniosek_id;
      try {
        const res = await axios.put(
          `http://localhost:5000/api/edytuj/${id}`,
          formDane,
        );
        //setSuccess(true);
        navigate("/");
        return res.data;
      } catch (error) {
        console.error(error);
        setError(true);
        throw error;
      } finally {
        setLadowanie(false);
      }
    } else {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/dodaj",
          formDane,
        );
        //setSuccess(true);
        navigate("/");
        return res.data;
      } catch (error) {
        console.error(error);
        setError(true);
        throw error;
      } finally {
        setLadowanie(false);
      }
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

      <div className="formularz container col-8 mb-3">
        <ProgressBar strona={strona} />
        {strona === 1 && (
          <Strona1
            dalej={dalej}
            formDane={formDane}
            setFormDane={setFormDane}
          />
        )}
        {strona === 2 && (
          <Strona2
            dalej={dalej}
            wstecz={wstecz}
            formDane={formDane}
            setFormDane={setFormDane}
          />
        )}
        {strona === 3 && (
          <Strona3
            dalej={dalej}
            wstecz={wstecz}
            formDane={formDane}
            setFormDane={setFormDane}
          />
        )}
        {/* {strona === 4 && (
          <Strona4
            dalej={dalej}
            wstecz={wstecz}
            formDane={formDane}
            setFormDane={setFormDane}
          />
        )} */}
        {strona === 4 && (
          <Strona5
            dalej={dalej}
            wstecz={wstecz}
            formDane={formDane}
            setFormDane={setFormDane}
            wyslijFormularz={wyslijFormularz}
            ladowanie={ladowanie}
            success={success}
            error={error}
          />
        )}
      </div>
    </>
  );
}

export default Formularz;
