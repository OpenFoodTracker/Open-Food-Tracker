
function nutritionCalculation(nutritionData, eatenQuantity) {
    const { energy, fat, proteins, carbs, quantity } = nutritionData;

    // Nutriments pro Gramm
    const energyPerGram = energy / 100;
    const fatPerGram = fat / 100;
    const proteinsPerGram = proteins / 100;
    const carbsPerGram = proteins / 100;

    // Nutriments je gegessene Quantity
    const eatenEnergy = energyPerGram * eatenQuantity;
    const eatenFat = fatPerGram * eatenQuantity;
    const eatenProteins = proteinsPerGram * eatenQuantity;
    const eatenCarbs = carbsPerGram * eatenQuantity;

    return {
        energy: eatenEnergy,
        fat: eatenFat,
        proteins: eatenProteins,
        carbs: eatenCarbs
    };  
  }
  



async function weightFetch(barcode, eatenQuantity) {
    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v3/product/${barcode}.json`); 
      const data = await response.json();
  
      const energy = data.product.nutriments["energy-kcal_100g"] || 0;
      const fat = data.product.nutriments.fat || 0;
      const proteins = data.product.nutriments.proteins || 0;
      const carbs = data.product.nutriments.carbs || 0;
  
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

const getRouteParameter = async (req, res) => {
    const { barcodeRequest, weightRequest } = req.params;
    var barcode = req.params["barcode"];
    var weight = req.params["weight"];

    try {
        var fetchResult = await weightFetch(barcode, weight);
        console.log(fetchResult);
        res.status(200).json({
            "barcode": barcode,
            "weight": weight,
            "energy": fetchResult["energy"],
            "protein": fetchResult["proteins"],
            "fat": fetchResult["fat"],
            "carbs": fetchResult["carbs"]
            

        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {getRouteParameter};
