import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function Scanner() {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      verbose: false,
      fps: 60,
    });

    function success(result) {
      setScanResult(result);
      handleScanResult(result);
      scanner.pause();
    }

    function error(error) {
      //console.warn(error)
    }

    scanner.render(success, error);

    return () => {
      scanner.clear().catch((error) => {
        console.error("Failed to clear scanner. ", error);
      });
    };
  }, []);
  //Barcode im fenster clearen
  const scannerStop = () => {
    setScanResult(null);
  };
  //Eingescannter Barcode Handeln
  const handleScanResult = async (barcode) => {
    const response = await fetch(
      "https://world.openfoodfacts.org/api/v2/product/" + barcode
    );
    const json = await response.json();
    console.log("Produkt:" + json.product.product_name);
    console.log("Kcal:" + json.product.nutriments["energy-kcal"]);
    console.log("Kohlenhydrate:" + json.product.nutriments.carbohydrates);
    console.log("Fett:" + json.product.nutriments.fat);
    console.log("Protein:" + json.product.nutriments.proteins);
    //return json;
  };

  return (
    <div>
      {scanResult ? (
        <div>
          {" "}
          scanResult: <p>{scanResult}</p>
        </div>
      ) : (
        <div id="reader" className="scannerdiv"></div>
      )}
      <button onClick={scannerStop}>Clear</button>
    </div>
  );
}

export default Scanner;
