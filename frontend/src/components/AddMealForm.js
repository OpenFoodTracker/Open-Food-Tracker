import {useState, useEffect} from "react"

import Button from '@mui/material/Button';


const AddMealForm = () => {
    const [error, setError] = useState(null)

    let ingredientJson;
    let ingredientJsonCopy;

    //
    const handleClose = () => {
        document.getElementById('dialog').style.display = 'none';
        ingredientJson.unit = document.getElementById('dialogUnit').value;
        if(ingredientJson.unit == "l" || ingredientJson.unit == "kg"){
            ingredientJson.amount = 1;
        }
        setValues(true);
    };

    const user = localStorage.getItem('user');
    //const occasion = localStorage.getItem('occasion');
    const occasion = "Sonstiges";
    
    useEffect(() => {
        //const ingredientId = localStorage.getItem('currentIngredientId');
        const ingredientId = '4061458234696';
        const fetchData = async () => {
            const response = await fetch(`/api/meals/ingredient/${ingredientId}`);
            const json = await response.json()
            if(!response.ok) {
                setError(json.error)
            }
            if(response.ok){
                return json;
            }
        };
        fetchData().then(data => {
            ingredientJson = data;
            if(!ingredientJson.unitUnknown){
                setValues(true);
            } else {
                document.getElementById('dialogUnit').value = 'g';  
                document.getElementById('addMealDialog').textContent = ingredientJson.unit;  
                document.getElementById('dialog').style.display = 'block';
                setValues(true);
            }
        });       
    }, []);

    function setValues(isSetup){
        if(isSetup){
            document.getElementById('occasionTitle').textContent = occasion;
            document.getElementById('amountInput').value = ingredientJson.amount;
            document.getElementsByClassName('ingredientName')[0].textContent = ingredientJson.name;
            try{
                document.getElementById('dropdown').value = ingredientJson.unit;
            } catch (Excpetion){

            }
            
            document.getElementById('addMealImage').src = ingredientJson.imageUrl;
            if(ingredientJson.unit == "l" || ingredientJson.unit == "kg"){
                ingredientJson.amount = 1;
                ingredientJson.kcal = ingredientJson.kcal*10;
                ingredientJson.protein = ingredientJson.protein*10;
                ingredientJson.fat = ingredientJson.fat*10;
                ingredientJson.carbs = ingredientJson.carbs*10;
            }
            ingredientJsonCopy = JSON.parse(JSON.stringify(ingredientJson));
        }

        document.getElementsByClassName('kcalData')[0].textContent = parseFloat(ingredientJson.kcal).toFixed(0) + " kcal";
        document.getElementsByClassName('fatData')[0].textContent = parseFloat(ingredientJson.fat).toFixed(1) + " g";
        document.getElementsByClassName('proteinData')[0].textContent = parseFloat(ingredientJson.protein).toFixed(1) + " g";
        document.getElementsByClassName('carbsData')[0].textContent = parseFloat(ingredientJson.carbs).toFixed(1) + " g";
    }

    function updateValues(){
        const currentAmount = document.getElementById('amountInput').value;
        const currentUnit = document.getElementById('dropdown').value;
        let scale;

        if(currentUnit == ingredientJsonCopy.unit || currentUnit == "ml" && ingredientJsonCopy.unit == "g" || currentUnit == "g" && ingredientJsonCopy.unit == "ml" ||
            currentUnit == "l" && ingredientJsonCopy.unit == "kg" || currentUnit == "kg" && ingredientJsonCopy.unit == "l"){
            scale = currentAmount/ingredientJsonCopy.amount;
        } else if(currentUnit == "ml" && ingredientJsonCopy.unit == "l" || currentUnit == "ml" && ingredientJsonCopy.unit == "kg" ||
                    currentUnit == "g" && ingredientJsonCopy.unit == "kg" || currentUnit == "g" && ingredientJsonCopy.unit == "l"){
            scale = currentAmount/ingredientJsonCopy.amount / 1000;
        } else if(currentUnit == "kg" && ingredientJsonCopy.unit == "g" || currentUnit == "kg" && ingredientJsonCopy.unit == "ml" ||
        currentUnit == "l" && ingredientJsonCopy.unit == "g" || currentUnit == "l" && ingredientJsonCopy.unit == "ml"){
            scale = currentAmount/ingredientJsonCopy.amount * 1000;
        }

        ingredientJson.amount = parseInt(currentAmount);
        ingredientJson.kcal = (ingredientJsonCopy.kcal*scale);
        ingredientJson.fat = (ingredientJsonCopy.fat*scale);
        ingredientJson.protein = (ingredientJsonCopy.protein*scale);
        ingredientJson.carbs = (ingredientJsonCopy.carbs*scale);
        ingredientJson.unit = currentUnit;
        
        setValues(false);
    }

    const addMeal = async (e) => {
        e.preventDefault()

        const mealData = ingredientJson;
        const userDate = new Date();
        const mealsFileId = "6645e1c508c1290013e1b332";//user.mealsFileId;
        const userId = "34424";//user.userId;
        let mealOccasion = "snack";
        if(occasion == "Frühstück"){
            mealOccasion = "breakfast";
        } else if(occasion == "Mittagessen"){
            mealOccasion = "lunch";
        } else if(occasion == "Abendessen"){
            mealOccasion = "dinner";
        } else if(occasion == "Sonstiges"){
            mealOccasion = "snack";
        }

        const meal = { mealsFileId, mealData, mealOccasion, userDate};

        const response = await fetch('/api/meals', {
            method: 'POST',
            body: JSON.stringify(meal),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
        }
        if(response.ok){
            console.log('new meal added', json)
        }
    }
    
    return (
        <div className="content">
            <div className="addMealHead">
                <div className="title" id="occasionTitle">None</div>
                <div className="ingredientName"></div>
            </div>
            <img id="addMealImage" src="" alt="Ingredient Image"></img>
            <div className="addMealForm">
                <div className="changeForm">
                    <label>Menge:</label>
                    <input id="amountInput"
                        type="number"
                    />
                    <select id="dropdown">
                        <option value="g">g</option>
                        <option value="kg">kg</option>
                        <option value="ml">ml</option>
                        <option value="l">l</option>
                    </select>
                    <button onClick={updateValues}>ok</button>
                </div>
            </div>
            <div className="addMealData">
                <div className="description">
                    <div className="kcal">Kalorien:</div> 
                    <div className="fat">Fett:</div>
                    <div className="protein">Protein:</div>
                    <div className="carbs">Kohlenhydrate:</div>
                </div>
                <div className="data">
                    <div className="kcalData"></div> 
                    <div className="fatData"></div>
                    <div className="proteinData"></div>
                    <div className="carbsData"></div>
                </div>
            </div>
            {error && <div className="error">{error}</div>}
            <Button variant="contained" color="primary" onClick={addMeal}>
                Füge Mahlzeit hinzu
            </Button>

            <div id="dialog">
            <div>Wir konnten die Einheit nicht entziffern.</div>
            <div>Welche Einheit möchtest du für folgende Mengenangabe:</div>
                <div id="dialogContent">
                    <div id="addMealDialog"></div>
                    <select id="dialogUnit">
                        <option value="g">g</option>
                        <option value="kg">kg</option>
                        <option value="ml">ml</option>
                        <option value="l">l</option>
                    </select>
                </div>
                <div id="dialogActions">
                    <Button onClick={handleClose}>Confirm</Button>
                </div>
            </div>



        </div>
    )
}

export default AddMealForm