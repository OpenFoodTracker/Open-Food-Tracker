import {useState, useEffect} from "react"
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';


const AddMealForm = () => {
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    let ingredientJson;
    let ingredientJsonCopy;

    //Closes Popup and handles value updates
    const handleClose = () => {
        document.getElementById('dialog').style.display = 'none';
        ingredientJson.unit = document.getElementById('dialogUnit').value;
        if(ingredientJson.unit == "l" || ingredientJson.unit == "kg"){
            ingredientJson.amount = 1;
        }
        setValues(true);
    };

    let user;
    let occasion;
    useEffect(() => {
        //gets data from local storage
        user = JSON.parse(localStorage.getItem('userData'));
        occasion = localStorage.getItem('occasion');
        const ingredientId = localStorage.getItem('currentIngredientId');
        const fetchData = async () => {
            console.log(ingredientId)
            const response = await fetch(`/api/meals/ingredient/${ingredientId}`);  //gets value of meal from backend
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
            if(ingredientJson){
                if(!ingredientJson.unitUnknown){                                         //if the unit is recognized, set all values
                    setValues(true);                        
                } else {
                    document.getElementById('dialogUnit').value = 'g';                   //ask the user for the prefered unit
                    document.getElementById('addMealDialog').textContent = ingredientJson.unit;  
                    document.getElementById('dialog').style.display = 'flex';
                    setValues(true);
                }
            } else {
                console.log("There was an error fetching the ingredient data.")
            }

        });       
    }, []);

    //sets all Values into the fields, isSetup = true, if its the setup of the values, else isSetup = false
    function setValues(isSetup){                                                     
        if(isSetup){
            document.getElementById('occasionTitle').textContent = occasion;         //sets values
            document.getElementsByClassName('ingredientName')[0].textContent = ingredientJson.name;
            try{
                document.getElementById('addMealImage').src = ingredientJson.imageUrl;
                document.getElementById('dropdown').value = ingredientJson.unit;
            } catch (error){

            }
            
            if(ingredientJson.unit == "l" || ingredientJson.unit == "kg"){          //sets correct values, if the unit is kg or l
                ingredientJson.amount = 1;
                ingredientJson.kcal = ingredientJson.kcal*10;
                ingredientJson.protein = ingredientJson.protein*10;
                ingredientJson.fat = ingredientJson.fat*10;
                ingredientJson.carbs = ingredientJson.carbs*10;
            }
            ingredientJsonCopy = JSON.parse(JSON.stringify(ingredientJson));        //makes a copy of ingredientJson
        }

        //sets correct nutriment values in the fields
        document.getElementById('amountInput').value = ingredientJson.amount;
        document.getElementsByClassName('kcalData')[0].textContent = parseFloat(ingredientJson.kcal).toFixed(0) + " kcal";
        document.getElementsByClassName('fatData')[0].textContent = parseFloat(ingredientJson.fat).toFixed(1) + " g";
        document.getElementsByClassName('proteinData')[0].textContent = parseFloat(ingredientJson.protein).toFixed(1) + " g";
        document.getElementsByClassName('carbsData')[0].textContent = parseFloat(ingredientJson.carbs).toFixed(1) + " g";
    }

    //recalculates all values, depending on input amount and unit from user
    function updateValues(){
        let currentAmount = document.getElementById('amountInput').value;         //gets input values
        const currentUnit = document.getElementById('dropdown').value;

        if(currentAmount == ingredientJson.amount){
            if(currentUnit == "ml" && ingredientJson.unit == "l" || currentUnit == "ml" && ingredientJson.unit == "kg" ||
                currentUnit == "g" && ingredientJson.unit == "kg" || currentUnit == "g" && ingredientJson.unit == "l"){
                currentAmount = parseFloat(currentAmount) * 1000;
            } else if(currentUnit == "kg" && ingredientJson.unit == "g" || currentUnit == "kg" && ingredientJson.unit == "ml" ||
                currentUnit == "l" && ingredientJson.unit == "g" || currentUnit == "l" && ingredientJson.unit == "ml"){
                currentAmount = parseFloat(currentAmount) / 1000;
            }
        }

        //calculates the scale
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


        ingredientJson.amount = parseFloat(currentAmount);                            //puts calculated values into ingredientJson
        ingredientJson.kcal = (ingredientJsonCopy.kcal*scale);
        ingredientJson.fat = (ingredientJsonCopy.fat*scale);
        ingredientJson.protein = (ingredientJsonCopy.protein*scale);
        ingredientJson.carbs = (ingredientJsonCopy.carbs*scale);
        ingredientJson.unit = currentUnit;
        
        setValues(false);
    }

    //sends API request to add meal with current data
    const addMeal = async (e) => {
        e.preventDefault()

        const mealData = ingredientJson;
        const userDate = localStorage.getItem('inputDate');                                              
        const mealsFileId = user.mealsFileId;

        let mealOccasion = "snack";                                                 //gets the correct occasion string for the api
        if(occasion == "Frühstück"){
            mealOccasion = "breakfast";
        } else if(occasion == "Mittagessen"){
            mealOccasion = "lunch";
        } else if(occasion == "Abendessen"){
            mealOccasion = "dinner";
        } else if(occasion == "Sonstiges"){
            mealOccasion = "snack";
        }

        const meal = { mealsFileId, mealData, mealOccasion, userDate};              //puts all data into one json

        const response = await fetch('/api/meals', {                                //sends the data to the backend
            method: 'PATCH',
            body: JSON.stringify(meal),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json()

        if(!response.ok) {
            setError(json.error)                                                    //handles error response from backend
        }
        if(response.ok){
            console.log('new meal added', json)                                     //prints reponse and returns no occasionMeals
            navigate('/occasionMeals');
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