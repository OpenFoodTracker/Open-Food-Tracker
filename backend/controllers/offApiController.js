//all currently valid units
const recognizedUnits = ["ml", "l", "g", "kg"];

//gets unit from parameter unitString, if the unit is in some form in the string like: "200 kg" or "3 l"
function getUnit(unitString){
    for(let i=0; i<recognizedUnits.length; i++){
        if(unitString.includes(` ${recognizedUnits[i]}`)){
            return recognizedUnits[i];
        }
    }
    return unitString;
}

//Gets ingredient from OpenFoodFacts specified by id
const getIngredient = async (req, res) => {
    const { id } = req.params;

    let ingredientData = {};
    ingredientData.unitUnknown = false;

    console.log(id);

    const error = await fetch(`https://world.openfoodfacts.org/api/v2/product/${id}?fields=product_name,nutriments,product_quantity_unit,quantity,image_front_url`)
        .then(response => {
            if (!response.ok) {
                return {};
            }
            
            return response.json(); 
        })
        .then(data => {
            try{
                const product = data.product;
                ingredientData.id = id;                                                       //gets relevant values from API and adds it to ingredientData
                ingredientData.name = product.product_name || "Product has no name";
                ingredientData.kcal = product.nutriments['energy-kcal_100g'] || 0;
                ingredientData.protein = product.nutriments.proteins_100g || 0;
                ingredientData.fat = product.nutriments.fat_100g || 0;
                ingredientData.carbs = product.nutriments.carbohydrates_100g || 0;
                ingredientData.imageUrl = product.image_front_url  || "https://world.o+penfoodfacts.org/images/icons/dist/packaging.svg";
                ingredientData.unit = product.product_quantity_unit;
                ingredientData.amount = 100; 
    
                if(!ingredientData.unit || !recognizedUnits.includes(ingredientData.unit)){ //if there is no given product unit or the givn one is not recognized
                    let tempUnit = product.quantity;                                        //try to recognize it 
                    tempUnit = tempUnit.toLowerCase();
                
                    ingredientData.unit = getUnit(tempUnit);
    
                    if(!recognizedUnits.includes(ingredientData.unit)){                     //is the unit is still not recognized, set the ingredient unit to unknown
                        ingredientData.unitUnknown = true;
                    }
                } 
            } catch (error){
                console.error('There was a problem with the fetch operation:', error);
                return error;
            }

        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            return error;
    });


    try {
        if(error){
            throw error;
        }
        return res.status(200).json(ingredientData);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: error.message });                         
    }
};


const searchIngredients = async (req, res) => {
    const { name } = req.params;

    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${name}&fields=code,product_name,product_quantity,product_quantity_unit,selected_images&json=1`
      );
      const json = await response.json();
      if(!response.ok){
        return res.status(400).json({ error: "Zugriff auf Open Food Facts fehlgeschlagen" }); 
      }
      res.status(200).json(json);
    } catch (error) {
      console.error("Error fetching data:", error); // Handle any errors that occur during the fetch
      return res.status(400).json({ error: "Zugriff auf Open Food Facts fehlgeschlagen" }); 
    }
};




module.exports = {
    getIngredient,
    searchIngredients,
};
