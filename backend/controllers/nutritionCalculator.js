const fetch = require('node-fetch');

async function weightFetch(barcode, eatenQuantity) {
  try {
    const response = await fetch(`https://world.openfoodfacts.org/api/v3/product/${barcode}.json`); 
    const data = await response.json();

    const energy = data.product.nutriments.energy || 0;
    const fat = data.product.nutriments.fat || 0;
    const proteins = data.product.nutriments.proteins || 0;

    const quantity =  data.product.product_quantity;   

    const nutritionData = {
        energy,
        fat,
        proteins,
        quantity
      };
      const nutritionResult = nutritionCalculation(nutritionData, eatenQuantity);
      
      return {
        ...nutritionResult,
        quantity
      }

  } catch (error) {
      console.error('Fehler beim Abrufen des Gewichts:', error);
      return null;
  }
}


function nutritionCalculation(nutritionData, eatenQuantity) {
    const { energy, fat, proteins, quantity } = nutritionData;

    // Nutriments pro Gramm
    const energyPerGram = energy / quantity;
    const fatPerGram = fat / quantity;
    const proteinsPerGram = proteins / quantity;

    // Nutriments je gegessene Quantity
    const eatenEnergy = energyPerGram * eatenQuantity;
    const eatenFat = fatPerGram * eatenQuantity;
    const eatenProteins = proteinsPerGram * eatenQuantity;

    return {
        energy: eatenEnergy,
        fat: eatenFat,
        proteins: eatenProteins
    };  
  }
  

module.exports = weightFetch;
