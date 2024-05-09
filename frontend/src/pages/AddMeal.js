import { useEffect, useState} from 'react'
//import { useMealsContext } from '../hooks/useMealsContext'

// components
//import MealDetails from '../components/MealDetails'
import AddMealForm from '../components/AddMealForm'

const AddMeal = () => {
    //const {meals, dispatch} = useMealsContext()
    //const [ isFetching, setIsFetching] = useState(false)

    //ToDO: useEffect hook machen
    //useEffect(() => {
        
    //}, [isFetching, dispatch])


    return (
        <div className="home">
            <AddMealForm />
        </div>
    )
}

export default AddMeal