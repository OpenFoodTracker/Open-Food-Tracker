import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import "./SearchComponent.css";
import SearchResultList from "./SearchResultList";

const SearchComponent = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  const fetchData = async (value) => {
    try {
      const response = await fetch(
        `/api/offApi/search/${value}`
      );
      if(response.ok){
        const json = await response.json();

        setResults(json.products); // Update the state with fetched results
        document.getElementsByClassName('search-results')[0].style.display = 'grid';
      }
    } catch (error) {
      console.error("Error fetching data:", error); // Handle any errors that occur during the fetch
    }
  };

  const handleChange = (value, e) => {
    setInput(value); // Update the input state
    if (value && e.key == 'Enter') {
      fetchData(value); // Fetch data if input is not empty
    } else if(!value) {
      document.getElementsByClassName('search-results')[0].style.display = 'none';
      setResults([]); // Clear results if input is empty
    }
  };

  return (
    <div>
    <div className="input-wrapper">
      <SearchIcon id="search-icon" />
      {/* Input field for entering the search term */}
      <input
        className="input is-primary"
        placeholder="Mahlzeit eingeben"
        value={input}
        onChange={(e) => handleChange(e.target.value, e)}
        onKeyDown={(e) => handleChange(input, e)}
      />
    </div>
      <SearchResultList results={results} />
      </div>
  );
};

export default SearchComponent;
