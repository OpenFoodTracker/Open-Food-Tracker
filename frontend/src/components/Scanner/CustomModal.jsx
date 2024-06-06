import React, { useState } from "react";
import "bulma/css/bulma.css";
import Scanner from "./Scanner";
import Button from '@mui/material/Button';

function CustomModal() {
  // State to track whether the modal is active (visible) or not
  const [active, setActive] = useState(false);

  // Function to toggle the modal's active state
  const handleClick = () => {
    setActive(!active);
  };

  return (
    <div className="modaloccasion">
      {/* Modal structure with conditional class to control visibility */}
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
            {/* Embedding the Scanner component within the modal */}
            <Scanner handleClose={handleClick} />
          </section>
          <footer className="modal-card-foot">
            {/* Button to close the modal */}
            <button onClick={handleClick} className="button">
              Back
            </button>
          </footer>
        </div>
      </div>
      {/* Button to open the modal */}
      <Button color="primary" variant="contained" onClick={handleClick} className="button is-default is-info">
        Start Scanner
      </Button>
    </div>
  );
}

export default CustomModal;