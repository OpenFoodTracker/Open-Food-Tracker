import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const ChangeMealSizeComponent = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [unit, setUnit] = useState(0);
    const [name, setName] = useState(0);
    const [imageUrl, setImageUrl] = useState('');

    const [user] = useState(JSON.parse(localStorage.getItem('userData')));
    const [occasion] = useState((localStorage.getItem('occasion')));
    const [tempDate] = useState((localStorage.getItem('inputDate')));

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

            try {
                const response = await fetch("/api/meal/user/getMeal/" + id, { 
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({user: user, occasion: mealOccasion, date: tempDate}),                 //question: why not updatedFormData?
                });
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
            Kalorien: (origCalories * faktor),   
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
          if(occasion === "Frühstück"){
              mealOccasion = "breakfast";
          } else if(occasion === "Mittagessen"){
              mealOccasion = "lunch";
          } else if(occasion === "Abendessen"){
              mealOccasion = "dinner";
          } else if(occasion === "Sonstiges"){
              mealOccasion = "snack";
          }
            console.log("frontend Date " + tempDate);
            console.log("frontend User: " + user);
            try {
              const response = await fetch('/api/meal/user/' + id, { 
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({mealData: formData, user: user, occasion: mealOccasion, date: tempDate}),                
              });

          
              if (!response.ok) {
                throw new Error('HTTP status ' + response.status);
              }
          
              const data = await response.json();
              console.log(data);
              navigate('/occasionMeals');
            } catch (error) {
              console.error('Error:', error);
            }
          };

        updateData();
        console.log('Formular abgeschickt:', updatedFormData);
    };

  

    

    return (
        <div className="content">
            <div className="addMealHead">
                <div className="title" id="occasionTitle">{occasion}</div>
                <div className="ingredientName">{name}</div>
            </div>

            
            
            <div className="image-container">
                <img id="addMealImageMealSize" src={imageUrl} alt="Ingredient" />
            </div>

            



            
            <form onSubmit={handleSubmit} className="mealSizeForm">

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
                    <div className="kcalData">{parseInt(formData.Kalorien).toFixed(2)} kcal</div> 
                    <div className="fatData">{parseInt(formData.Fett).toFixed(2)} g</div>
                    <div className="proteinData">{parseInt(formData.Proteine).toFixed(2)} g</div>
                    <div className="carbsData">{parseInt(formData.Kohlenhydrate).toFixed(2)} g</div>
                </div>
                
            </div>
           
            
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Speichern
            </Button>
        </form>
    </div>
    )
};


export default ChangeMealSizeComponent;
