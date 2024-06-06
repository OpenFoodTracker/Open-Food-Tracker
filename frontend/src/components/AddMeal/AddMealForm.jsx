import {useState, useEffect} from "react"
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { format } from 'date-fns';

const AddMealForm = () => {
    const [user] = useState(JSON.parse(localStorage.getItem('userData')));
    const [date] = useState(localStorage.getItem('inputDate'));
    const [occasion] = useState(localStorage.getItem('occasion'));
    const [meal, setMeal] = useState(null);
    const [originalMeal, setOriginalMeal] = useState(null);
    const [error, setError] = useState(null)
    const navigate = useNavigate();


    //Closes Popup and handles value updates
    const handleClose = () => {
        document.getElementById('dialog').style.display = 'none';
        setValues();
    };

    useEffect(() => {
        console.log("A");
        const ingredientId = localStorage.getItem('currentIngredientId');
        const fetchData = async () => {
            const response = await fetch(`/api/offApi/ingredient/${ingredientId}`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
              });  //gets value of meal from backend
            const json = await response.json()
            if(!response.ok) {
                setError(json.error)
            }
            if(response.ok){
                return json;
            }
        };
        fetchData().then(data => {
            console.log("B");
            setMeal(data);
            setOriginalMeal(data); 
        });       
    }, []);

    useEffect(() => {
        if (meal) {
            if (meal.unitUnknown) {
                setMeal(prevMeal => ({ ...prevMeal, unit: 'g' }));
                setOriginalMeal(prevMeal => ({ ...prevMeal, unit: 'g' }));
                document.getElementById('dialog').style.display = 'flex';
            }
            setValues();
        }
    }, [originalMeal]);

    //sets Values, if unit is l or kg
    function setValues(){                                                     
        if(meal.unit === "l" || meal.unit === "kg"){          //sets correct values, if the unit is kg or l
            setMeal(prevMeal => ({
                ...prevMeal,
                amount: 1,
                kcal: prevMeal.kcal*10,
                protein: prevMeal.protein*10,
                fat: prevMeal.fat*10,
                carbs: prevMeal.carbs*10
             }));

        }
    }

    const changeUnit = (event) => {
        const newUnit = event.target.value;

        let scale = 1;
        if((newUnit === 'ml' && meal.unit === 'l') || (newUnit === 'ml' && meal.unit === 'kg') ||
           (newUnit === 'g' && meal.unit === 'kg') || (newUnit === 'g' && meal.unit === 'l')){
            scale = 1000;
        } else if((newUnit === 'l' && meal.unit === 'ml') || (newUnit === 'l' && meal.unit === 'g') ||
                  (newUnit === 'kg' && meal.unit === 'g') || (newUnit === 'kg' && meal.unit === 'ml')){
         scale = 0.001;
        }

        //const amountScale = meal.amount/originalMeal.amount;
        setMeal(prevMeal => ({
            ...prevMeal,
            unit: newUnit,
            amount: meal.amount * scale,
            //kcal: originalMeal.kcal * scale * amountScale,
            //protein: originalMeal.protein * scale * amountScale,
            //fat: originalMeal.fat * scale * amountScale,
            //carbs: originalMeal.carbs * scale * amountScale
        }));
    }

    const changeAmount = (event) => {
        const newAmount = event.target.value;

        let unitScale = 1;
        if((meal.unit === 'ml' && originalMeal.unit === 'l') || (meal.unit === 'ml' && originalMeal.unit === 'kg') ||
           (meal.unit === 'g' && originalMeal.unit === 'kg') || (meal.unit === 'g' && originalMeal.unit === 'l')){
            unitScale = 0.001;
        } else if((meal.unit === 'l' && originalMeal.unit === 'ml') || (meal.unit === 'l' && originalMeal.unit === 'g') ||
                  (meal.unit === 'kg' && originalMeal.unit === 'g') || (meal.unit === 'kg' && originalMeal.unit === 'ml')){
            unitScale = 1000;
        }

        const amountScale = newAmount/originalMeal.amount;
        setMeal(prevMeal => ({
            ...prevMeal,
            amount: newAmount,
            kcal: originalMeal.kcal * amountScale * unitScale,
            protein: originalMeal.protein *  amountScale * unitScale,
            fat: originalMeal.fat * amountScale * unitScale,
            carbs: originalMeal.carbs * amountScale * unitScale
        }));
    }

    //sends API request to add meal with current data
    const addMeal = async (e) => {
        e.preventDefault()
                                        
        const mealsFileId = user.mealsFileId;

        let mealOccasion = "snack";                                                 //gets the correct occasion string for the api
        if(occasion === "Frühstück"){
            mealOccasion = "breakfast";
        } else if(occasion === "Mittagessen"){
            mealOccasion = "lunch";
        } else if(occasion === "Abendessen"){
            mealOccasion = "dinner";
        } else if(occasion === "Sonstiges"){
            mealOccasion = "snack";
        }

        const mealJson = { mealsFileId, mealData: meal, occasion: mealOccasion, userDate: date};              //puts all data into one json

        const response = await fetch('/api/meal/user', {                                //sends the data to the backend
            method: 'PATCH',
            body: JSON.stringify(mealJson),
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
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
                <div className="title" id="occasionTitle">{occasion}</div>
                <div className="addMealDate">{format(date, 'yyyy-MM-dd')}</div>
                <div className="ingredientName">{meal && meal.name}</div>
            </div>
            <img id="addMealImage" src={meal && meal.imageUrl} alt="Ingredient"></img>
            <div className="addMealForm">
                <div className="changeForm">
                    <label>Menge:</label>
                    <input id="amountInput" type="number" value={(meal && meal.amount)||0} onChange={changeAmount}/>
                    <select id="dropdown" value={meal && meal.unit} onChange={changeUnit}>
                        <option value="g">g</option>
                        <option value="kg">kg</option>
                        <option value="ml">ml</option>
                        <option value="l">l</option>
                    </select>
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
                    <div className="kcalData">{meal && meal.kcal.toFixed(0)} kcal</div> 
                    <div className="fatData">{ meal && meal.fat.toFixed(1)} g</div>
                    <div className="proteinData">{ meal && meal.protein.toFixed(1)} g</div>
                    <div className="carbsData">{ meal && meal.carbs.toFixed(1)} g</div>
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
                    <div id="addMealDialog">{originalMeal &&  originalMeal.unit}</div>
                    <select id="dialogUnit" value={meal && meal.unit} onChange={changeUnit}>
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