import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

function Scanner({ handleClose }) {
  // State to hold the result of the QR code scan
  const [scanResult, setScanResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize the QR code scanner with specific configuration
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      verbose: false,
      fps: 60,
      rememberLastUsedCamera: false,
    });

    // Function to handle successful scan
    function success(result) {
      setScanResult(result);
      scanner.pause();
      handleScanResult(result);
    }

    // Function to handle scanning errors
    function error(error) {
      //console.log(error);
    }

    // Start the scanner and set up the callback functions
    scanner.render(success, error);

    // Cleanup function to clear the scanner when the component unmounts
    return () => {
      scanner.clear().catch((error) => {
        console.error("Failed to clear scanner. ", error); // Log any errors that occur during cleanup
      });
    };
  }, []);

  // Function to stop the scanner and navigate to the AddMeal page
  const scannerStop = () => {
    setScanResult(null); // Reset the scan result state
    handleClose(); // Call the handleClose function passed as a prop
    navigate("/addMeal");
  };

  // Function to handle the scanned result
  const handleScanResult = async (barcode) => {
    localStorage.setItem("currentIngredientId", barcode); // Store the barcode in localStorage
    const currentIngredientID = localStorage.getItem("currentIngredientId"); // Retrieve the stored barcode
    console.log(currentIngredientID); // Log the barcode (for debugging purposes)
  };

  return (
    <div>
      {scanResult ? (
        // Display the scan result if available
        <div>
          scanResult: <p>{scanResult}</p>
        </div>
      ) : (
        // Render the QR code scanner element
        <div id="reader" className="scannerdiv"></div>
      )}
      {/* Button to stop the scanner and proceed */}
      <button onClick={scannerStop}>Mahlzeit eintragen</button>
    </div>
  );
}

export default Scanner;