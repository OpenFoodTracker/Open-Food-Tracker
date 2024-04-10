import { useEffect, useState} from 'react'
import { useMealsContext } from '../hooks/useMealsContext'

// components
import MealDetails from '../components/MealDetails'
import MealForm from '../components/MealForm'

const Home = () => {
    const {meals, dispatch} = useMealsContext()
    const [ isFetching, setIsFetching] = useState(false)
    useEffect(() => {
        if(!isFetching){

            const fetchMeals = async ()=> {
                const response = await fetch('/api/meal/')
                const json = await response.json()
                
                if (response.ok){
                    dispatch({type: 'SET_MEALS', payload: json})
                }
            }
            
            fetchMeals()
            setIsFetching(true)
        }
    }, [isFetching, dispatch])


    return (
        <div className="home">
            <div className="meals">
                {meals && meals.map((meal) => (
                    <MealDetails key={meal._id} meal = {meal} />
                    
                ))}    
            </div>
            <MealForm/>
        </div>
    )
}

export default Home