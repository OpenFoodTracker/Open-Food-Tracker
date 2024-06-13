import {useState, useEffect} from "react";
import {Grid, Container, Avatar, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Button, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchComponent from "../Searchbar/SearchComponent";
import { useNavigate } from 'react-router-dom';
import CustomModal from "../Scanner/CustomModal";
import { format, addDays, subDays } from 'date-fns'; // Library for date manipulation

const OccasionMealsComponent = () => {
    const [ingredients, setIngredients] = useState([]);
    const [occasion, setOccasion] = useState('');
    const [occasionData, setOccasionData] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigate = useNavigate();

    let meals;
    let user;
    useEffect(() => {
        user = JSON.parse(localStorage.getItem('userData'));
        const occasionFromLocalStorage = localStorage.getItem('occasion');
        const inputDate = localStorage.getItem('inputDate');
        setOccasion(occasionFromLocalStorage);
        setSelectedDate(inputDate);

        let mealOccasion = "snack";
        if(occasionFromLocalStorage === "Frühstück"){
            mealOccasion = "breakfast";
        } else if(occasionFromLocalStorage === "Mittagessen"){
            mealOccasion = "lunch";
        } else if(occasionFromLocalStorage === "Abendessen"){
            mealOccasion = "dinner";
        } else if(occasionFromLocalStorage === "Sonstiges"){
            mealOccasion = "snack";
        }

        const fetchData = async () => {
            const response = await fetch(`/api/meal/user/getOccasion`, { 
                method: 'POST',
                body: JSON.stringify({mealsFileId: user.mealsFileId, occasion : mealOccasion, userDate: inputDate}),
                headers: {
                    'Content-Type': 'application/json'
            }});  

            if(!response.ok) {
                console.log(response);
            }
            if(response.ok){
                if(response.status === 204){
                    return {};
                } else {
                    const json = await response.json();
                    return json;
                }
            }
        };

        setOccasionData({
            mealsFileId: user.mealsFileId,
            occasion: mealOccasion,
            userDate: inputDate,
        });

        fetchData().then(data => {
            meals = data;
            if(Object.keys(meals).length !== 0){
                setIngredients(meals);
            }
        });
    }, []);

    const deleteMeal = async (id) => {
        const response = await fetch(`/api/meal/user/occasion/${id}`, {
            method: 'DELETE',
            body: JSON.stringify(occasionData),
            headers: {
                'Content-Type': 'application/json'
        }});

        const json = await response.json();
        if(!response.ok) {
            console.log(json.error);
        }
        if(response.ok){
            return json;
        }
    };

    const handleDeleteMeal = (index) => {
        const response = deleteMeal(ingredients[index]._id);
        if(response){
            const newIngredients = ingredients.filter((_, i) => i !== index);
            setIngredients(newIngredients);
        }
    };

    const handleItemClick = (index) => {
        localStorage.setItem('idToChange', ingredients[index]._id);
        console.log(ingredients[index]._id);     
        navigate(`/meal/${ingredients[index]._id}`);
    };

    return (
        <div className="content">
            <Box className="occasionHead">
                <Grid item xs={8} sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" id="OccasionDatum">{format(selectedDate, 'dd.MM.yyyy')}</Typography>
                </Grid>
                <Typography className="text" variant="h6" sx={{ margin:'0px' }}>{occasion}</Typography>
            </Box>
            <div className="occasionSearchBlock"></div>  
            <Box className="occasionMealList">
                    <SearchComponent />
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
            <CustomModal/>
            </Box>
        </div>
    );
};

export default OccasionMealsComponent;
