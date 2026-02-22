import { useState } from "react";
import Formularz from "../Formularz/Formularz";
import Przegladarka from "./Przegladarka";

function Lista() {
  const [formDane, setFormDane] = useState(null); // dane do formularza
  const [edytuj, setEdytuj] = useState(false); // czy pokazujemy formularz w trybie edycji

  return (
    <>
      {edytuj ? (
        <Formularz
          dane={formDane}
          edytuj={edytuj}
          setEdytuj={setEdytuj} // żeby po zapisaniu/formularzu móc wrócić do listy
        />
      ) : (
        <Przegladarka setFormDane={setFormDane} setEdytuj={setEdytuj} />
      )}
    </>
  );
}

export default Lista;
