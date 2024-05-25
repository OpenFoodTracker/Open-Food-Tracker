import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ChangeMealSizeComponent = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [unit, setUnit] = useState(0);
    const [name, setName] = useState(0);

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
                    setOrigAmount(json["amount"]);
                    setOrigCalories(json["kcal"]);
                    setOrigCarbs(json["carbs"]);
                    setOrigFat(json["fat"]);
                    setOrigProtein(json["protein"]);
                    setFormData((prevData) => ({
                        ...prevData,
                        Kalorien: json["kcal"],     //initialised, don't change later. So it's a problem with showing them in the frontend
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
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        var faktor = value / origAmount;
        formData.carbs = origCarbs * faktor; 
        formData.kcal = origCalories * faktor; 
        formData.protein = origProtein * faktor; 
        formData.fat = origFat * faktor; 
        formData.amount = value;    
        
        

        console.log(value);
        console.log(name);
        console.log("called");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedFormData = {
            ...formData,
            updatedAt: new Date().toISOString() 
        };

        const updateData = async () => {
            try {
              const response = await fetch('/api/meal/' + id, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
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

    return (
        <div>
            <h1>{name}</h1>
            <p>{formData.kcal}</p>
            <form onSubmit={handleSubmit}>
            <label>
                    Menge
                    <input
                        type="text"
                        name="Menge"
                        value={formData.Menge}  //don't change. But ig you show fromData.amount instead hey start with undefined value until they are actually changed
                        onChange={handleInputChange}
                        autoComplete="new-password"
                    />
                </label>
                <p>{unit}</p>
                <br />
                <label>
                    Kalorien
                    <input
                        type="text"
                        name="Kalorien"
                        value={formData.Kalorien}
                        onChange={handleInputChange}
                        disabled
                    />
                </label>
                <br />
                <label>
                    Kohlenhydrate
                    <input
                        type="text"
                        name="Kohlenhydrate"
                        value={formData.Kohlenhydrate}
                        onChange={handleInputChange}
                        disabled
                    />
                </label>
                <br />
                <label>
                    Proteine
                    <input
                        type="text"
                        name="proteins"
                        value={formData.Proteine}
                        onChange={handleInputChange}
                        disabled
                    />
                </label>
                <br />
                <label>
                    Fett
                    <input
                        type="text"
                        name="fat"
                        value={formData.Fett}
                        onChange={handleInputChange}
                        disabled
                    />
                </label>
                <br />
                
                <button type="submit">Abschicken</button>
            </form>
        </div>
    );
};

export default ChangeMealSizeComponent;
