import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import './MealSize.css';


const MealSize = () => {
    let ingredientJson;
    let ingredientJsonCopy;

    const navigate = useNavigate();
    const { id } = useParams();

    const [unit, setUnit] = useState(0);
    const [name, setName] = useState(0);
    const [imageUrl, setImageUrl] = useState('');

    const [user] = useState(JSON.parse(localStorage.getItem('userData')));
    const [occasion, setOccasion] = useState((localStorage.getItem('occasion')));
    const [date, setDate] = useState((localStorage.getItem('inputDate')));

    const [origAmount, setOrigAmount] = useState(0);
    const [origCarbs, setOrigCarbs] = useState(0);
    const [origCalories, setOrigCalories] = useState(0);
    const [origProtein, setOrigProtein] =useState(0);
    const [origFat, setOrigFat] = useState(0);

    const [formData, setFormData] = useState({
        Kalorien: '',
        Kohlenhydrate: '',
        Fett: '',
        Proteine: '',
        Menge: '',
    });
   
    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await fetch("/api/meal/single/" + id);
                if (response.ok) {
                    const json = await response.json();
                    setUnit(json["unit"]);
                    setName(json["name"]);
                    setImageUrl(json["imageUrl"]);
                    setOrigAmount(json["amount"]);
                    setOrigCalories(json["kcal"]);
                    setOrigCarbs(json["carbs"]);
                    setOrigFat(json["fat"]);
                    setOrigProtein(json["protein"]);
                    setFormData((prevData) => ({
                        ...prevData,

                        Kalorien: json["kcal"],     
                        Kohlenhydrate: json["carbs"],
                        Proteine: json["protein"],
                        Fett: json["fat"],
                        Menge: json["amount"],
                    }));
                } else {
                    console.error('Fehler beim Abrufen der Daten:', response.status);
                }
            } catch (error) {
                console.error('Fehler beim Fetchen:', error);
            }
        };
        
        fetchMeals();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const faktor = value / origAmount;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        setFormData((prevData) => ({
            ...prevData,
            Kalorien: (origCalories * faktor),   //toFixed?
            Kohlenhydrate: (origCarbs * faktor), 
            Proteine: (origProtein * faktor), 
            Fett: (origFat * faktor),
            Menge: value,   
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedFormData = {
            ...formData,
            updatedAt: new Date().toISOString() 
        };

        const updateData = async () => {
            
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
            console.log("frontend Date " + date);
            console.log("frontend User: " + user);
            try {
              const response = await fetch('/api/meals/' + id, { //question: in AddMealForm route is  fetch('/api/meals' and in userMealsRouter routes are ('/', addMeal); and ('/:id', updateMeal); so why is it meal in one and meals in the other?
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({mealData: formData, user: user, occasion: mealOccasion, date: date}),                 //question: why not updatedFormData?
              });

          
              if (!response.ok) {
                throw new Error('HTTP status ' + response.status);
              }
          
              const data = await response.json();
              console.log(data);
            } catch (error) {
              console.error('Error:', error);
            }
          };

        updateData();
        navigate('/occasionMeals');
        console.log('Formular abgeschickt:', updatedFormData);
    };

    function setValues(isSetup){                                                     
        if(isSetup){
            
            document.getElementsByClassName('ingredientName')[0].textContent = ingredientJson.name;
            try{
                document.getElementById('addMealImage').src = ingredientJson.imageUrl;
                document.getElementById('dropdown').
                value = ingredientJson.unit;
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

    

    return (
        <div className="content">
            <div className="addMealHead">
                    <div className="title" id="occasionTitle">{occasion}</div>
                    <div className="ingredientName">{name}</div>
                </div>
            <img id="addMealImage" src={imageUrl} alt="Ingredient"></img>



            
            <form onSubmit={handleSubmit}>

            <div className="addMealForm">
                <div className="changeForm">
                <label>Menge:</label>
                    <input id="amountInput"
                        type="number"
                        name="Menge"
                        value={formData.Menge} 
                        onChange={handleInputChange}
                        autoComplete="new-password"
                    />
                    <p>{unit}</p> 
                    
                    {/* <Button onClick={updateValues}>ok</Button>  */}
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
                    <div className="kcalData">{formData.Kalorien} kcal</div> 
                    <div className="fatData">{formData.Fett} g</div>
                    <div className="proteinData">{formData.Proteine} g</div>
                    <div className="carbsData">{formData.Kohlenhydrate} g</div>
                </div>
                
            </div>
           
            
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Abschicken
            </Button>
        </form>
    </div>
    )
};

export default MealSize;
