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
          {/* Check if the nested structure exists and then display the small image */}
          {result.selected_images && result.selected_images.front && result.selected_images.front.small && result.selected_images.front.small.en ? (
            <div className="search-image-container">
              <img
                src={result.selected_images.front.small.en}
                alt={<ImageNotSupportedIcon/>}
              />
            </div>
          ) : (
            <p><ImageNotSupportedIcon/></p>
          )}
          <p>{result.product_name || "No product name"}</p>
          <p>
            Menge: {result.product_quantity || "No quantity"}{" "}
            {result.product_quantity_unit || ""}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SearchResultList;
