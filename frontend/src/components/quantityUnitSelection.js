import React from 'react';
import ServingQuantityAvailability from './quantityUnits';

const QuantityUnitSelection = ({ data }) => {
    const openPopup = ServingQuantityAvailability(data);

    const handleClick = () => {
        if (openPopup) {
    
        } else {
            
        }
    };

    return (
        <div>
            <button onClick={handleClick}>Gramm</button>
        </div>
    );
};

export default QuantityUnitSelection;
