import {useState, useEffect} from "react"
import { Container, Avatar, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Button, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';
import CustomModal from "./Scanner/CustomModal";


const OccasionMealsComponent = () => {
    const [ingredients, setIngredients] = useState([]);
    const [occasion, setOccasion] = useState('');
    const [occasionData, setOccasionData] = useState({});
    const navigate = useNavigate();

    let meals;
    let user;
    useEffect(() => {
        user = JSON.parse(localStorage.getItem('userData'));
        const occasionFromLocalStorage = localStorage.getItem('occasion');
        const inputDate = localStorage.getItem('inputDate');
        setOccasion(occasionFromLocalStorage);

        let mealOccasion = "snack";                                                 //gets the correct occasion string for the api
        if(occasionFromLocalStorage == "Frühstück"){
            mealOccasion = "breakfast";
        } else if(occasionFromLocalStorage == "Mittagessen"){
            mealOccasion = "lunch";
        } else if(occasionFromLocalStorage == "Abendessen"){
            mealOccasion = "dinner";
        } else if(occasionFromLocalStorage == "Sonstiges"){
            mealOccasion = "snack";
        }
        
        const date = inputDate;           
        
        const fetchData = async () => {                                             //gets all meals from current user, occasion and date
            const response = await fetch(`/api/meals/occasion`, { 
                method: 'POST',
                body: JSON.stringify({mealsFileId: user.mealsFileId, occasion : mealOccasion, userDate: date}),
                headers: {
                    'Content-Type': 'application/json'
            }});  
   
            if(!response.ok) {
                console.log(response);
            }
            if(response.ok){
                if(response.status == 204){
                    return {};
                } else {
                    const json = await response.json()
                    return json;
                }
            }
        };

        setOccasionData({                                                           //sets important Values to useState
            mealsFileId: user.mealsFileId,
            occasion: mealOccasion,
            userDate: date,
        });

        fetchData().then(data => {
            meals = data;
            if(Object.keys(meals).length !== 0){
                setIngredients(meals); 
            }                                         //sets all meals to list
        });
    }, []);

    //deletes meal from database 
    const deleteMeal = async (id) => {
        const response = await fetch(`/api/meals/occasion/${id}`, {                 //sends delete request of clicked item
            method: 'DELETE',
            body: JSON.stringify(occasionData),
            headers: {
                'Content-Type': 'application/json'
        }});  //gets value of meal from backend

        const json = await response.json()
        if(!response.ok) {
            console.log(json.error);
        }
        if(response.ok){
            return json;
        }
    };

    //triggered by clicking the bin button by an ingredient
    const handleDeleteMeal = (index) => {
        const response = deleteMeal(ingredients[index]._id);
        if(response){
            const newIngredients = ingredients.filter((_, i) => i !== index);
            setIngredients(newIngredients);
        }
    };

    //triggered by clicking on an ingredient
    const handleItemClick = (index) => {
        localStorage.setItem('idToChange', ingredients[index]._id);                 //sets id of clicked object to local storage
        console.log(ingredients[index]._id)     
        //navigate("/seitenname");                                                  //TODO Hier auf die andere Seite verweisen und die Werte anpassen
    };                                                                              //Am besten danach auf diese Seite hier wieder zurück verweisen

    //triggered by clicking the scan button
    const scanQRCode = () => {
        console.log("Hier Scannen dann");                                           //TODO die Scan Logik hier implementieren 
    }

    return (
        <div className="content">
            <Box className="occasionHead">
                <Typography className="text">{occasion}</Typography>
                <QrCodeScannerIcon className="qrIcon" />
                {/*<Button
                    className="scanButton"
                    variant="contained"
                    onClick={() => scanQRCode()}
                >
                    Scannen
                </Button>*/}
                <CustomModal />
            </Box>
            <div className="occasionSearchDiv">
                <SearchBar />
            </div>     
            <Box className="occasionMealList">
                <List className="occasionList">
                    {ingredients.map((meal, index) => (
                        <ListItem key={index} className="occasionMealListItem" button onClick={() => handleItemClick(index)}>
                        <div className="imageDiv">
                            <img src={meal.imageUrl} alt={meal.name} />
                        </div>
                        <ListItemText
                            primary={
                            <span className="listItemText">
                                <span>{meal.name}</span>
                            </span>
                            }
                            secondary={<span>{meal.amount} {meal.unit} - {meal.kcal.toFixed(0)} kcal</span>}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteMeal(index)}>
                            <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </div>
    );
};


export default OccasionMealsComponent