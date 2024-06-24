import React, { useState } from "react";
// import SearchIcon from '@mui/icons-material/Search';
import SearchIcon from "./search.png"
import "./SearchComponent.css";
import SearchResultList from "./SearchResultList";

const SearchComponent = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const fetchData = async (value) => {
    try {
      const response = await fetch(
        `/api/offApi/search/${value}`
        , {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`
          }
        });
      if(response.ok){
        const json = await response.json();
        if (json.products.length === 0) {
          setNoResults(true);
        } else {
          setResults(json.products); // Update the state with fetched results
          setNoResults(false);
        }
        const searchResults = document.getElementsByClassName('search-results');
        if(searchResults.length > 0){
          searchResults[0].style.display = 'grid';
        }
        

      }
    } catch (error) {
      console.error("Error fetching data:", error); // Handle any errors that occur during the fetch
    }
  };

  const handleChange = (value, e) => {
    setInput(value); // Update the input state
    if (value && e.key == 'Enter') {
      fetchData(value); // Fetch data if input is not empty
    } else if (!value) {
      setNoResults(false);
      const searchResults = document.getElementsByClassName('search-results');
      if(searchResults.length > 0){
        searchResults[0].style.display = 'grid';
      }
      setResults([]); // Clear results if input is empty
    }
  };

  return (
    <div> 
      <div className="input-wrapper"> 
        {/* <SearchIcon id="search-icon" /> */}
        <img src={SearchIcon} alt="Search" height="20" width="30"/>
        <input
          className="input is-primary"
          placeholder="Mahlzeit eingeben"
          value={input}
          onChange={(e) => handleChange(e.target.value, e)}
          onKeyDown={(e) => handleChange(input, e)}
          color="black"
        />
      </div>
      {noResults ? (
        <div className="no-results">Keine Ergebnisse gefunden</div>
      ) : (
        <SearchResultList results={results} />
      )}
    </div>
  );
};

export default SearchComponent;
