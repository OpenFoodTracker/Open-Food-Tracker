import React, { useState } from 'react';

const QuantityInput = ({ onButtonClick }) => {
    const [quantity, setQuantity] = useState('');
  
    const handleInputChange = (event) => {
      setQuantity(event.target.value);
    };
  
    const handleButtonClick = () => {
      onButtonClick(quantity);
    };
  
    return (
      <div>
        <input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          placeholder="Enter quantity"
        />
        <button onClick={handleButtonClick}>Submit</button>
      </div>
    );
  };
  
  export default QuantityInput;