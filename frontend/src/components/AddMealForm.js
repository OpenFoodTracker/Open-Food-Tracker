import {useState, useEffect} from "react"

import { useMealsContext } from '../hooks/useMealsContext'

const AddMealForm = () => {
    const {dispatch} = useMealsContext()
    const [occasion, setOccasion] = useState('')
    const [amount, setAmount] = useState('')
    const [error, setError] = useState(null)

    const userId = localStorage.getItem('userId');

    let ingredientJson;
    let ingredientJsonCopy;
    
    useEffect(() => {
        //const ingredientId = localStorage.getItem('currentIngredientId');
        const ingredientId = '5449000214911';
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000/api/meals/ingredient/${ingredientId}`);
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
            ingredientJsonCopy = JSON.parse(JSON.stringify(data));
            setValues(true);
        });       
    }, []);

    function setValues(isSetup){
        if(isSetup){
            document.getElementById('amountInput').value = 100;
            document.getElementsByClassName('ingredientName')[0].textContent = ingredientJson.name;
            document.getElementById('dropdown').value = ingredientJson.unit;
            document.getElementById('addMealImage').src = ingredientJson.imageUrl;
            ingredientJsonCopy.amount = 100;
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
        if(currentUnit == ingredientJson.unit){
            scale = currentAmount/ingredientJsonCopy.amount;
        }

        ingredientJson.amount = parseInt(currentAmount);
        ingredientJson.kcal = (ingredientJsonCopy.kcal*scale);
        ingredientJson.fat = (ingredientJsonCopy.fat*scale);
        ingredientJson.protein = (ingredientJsonCopy.protein*scale);
        ingredientJson.carbs = (ingredientJsonCopy.carbs*scale);
        
        setValues(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const meal = {userId, ingredientJson, occasion, amount}

        const response = await fetch('/api/meals', {
            method: 'POST',
            body: JSON.stringify(meal),
            headers: {
                'Content-Type': 'application/json'
            }
        }, [dispatch])

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
                <div className="title">Abendessen</div>
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
                        <option value="stk">stk</option>
                    </select>
                    <button onClick={updateValues}>ok</button>
                    {error && <div className="error">{error}</div>}
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
        </div>
    )
}

export default AddMealForm