import { React, useState } from "react";
import "bulma/css/bulma.css";
import Scanner from "./Scanner";

function CustomModal() {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <div>
      <div className={`modal ${active ? "is-active" : ""}`}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">QR/Barcode Scanner</p>
            <button
              onClick={handleClick}
              className="delete"
              aria-label="close"
            />
          </header>
          <section className="modal-card-body">
            <Scanner />
          </section>
          <footer className="modal-card-foot">
            <button onClick={handleClick} className="button">
              Back
            </button>
          </footer>
        </div>
      </div>
      <button onClick={handleClick} className="button is-small is-info">
        Start Scanner
      </button>
    </div>
  );
}

export default CustomModal;
