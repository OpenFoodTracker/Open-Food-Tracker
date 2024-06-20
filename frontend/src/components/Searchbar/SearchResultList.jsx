import React from "react";
import "./SearchComponent.css";
import { useNavigate } from "react-router-dom";
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

const SearchResultList = ({ results }) => {
  const navigate = useNavigate();

  const SelectMeal = (result) => {
    const id = parseInt(result.code);
    console.log(id);
    localStorage.setItem("currentIngredientId", id);
    navigate("/addMeal");
  };

  return (
    <div className="search-results">
      {/* Display search results */}
      {results.map((result) => (
        <div key={result.code} className="result-item" onClick={() => SelectMeal(result)}>

        
            {result.image_front_url ? (
              <div className="s-image-container">
                <img
                  src={result.image_front_url}
                  alt={<ImageNotSupportedIcon/>}
                />
              </div>
            ) : (
              <p><ImageNotSupportedIcon/></p>
            )}
            <p className="searchText">{result.product_name || "Kein Produktname"}</p>
            <p className="searchText">
              Menge: {result.product_quantity || "Keine Angabe"}{" "}
              {result.product_quantity_unit || ""}
            </p>
          </div>
      ))}
    </div>
  );
};

export default SearchResultList;
