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
    }

    function error(error) {
      //console.warn(error)
    }

    scanner.render(success, error);

    // cleanup function when component will unmount
    return () => {
      scanner.clear().catch((error) => {
        console.error("Failed to clear scanner. ", error);
      });
    };
  }, []);

  const scannerStop = () => {
    setScanResult(null);
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
