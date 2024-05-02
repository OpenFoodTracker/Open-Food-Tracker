import { useMealsContext } from "../hooks/useMealsContext"
import { formatDistanceToNow } from "date-fns"

const MealDetails = ({ meal}) => {
    
    const {dispatch} = useMealsContext()


    const handleClick = async () => {
        const response = await fetch('/api/meal/' + meal._id,{
            method: 'DELETE'
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }
    
    return (
        <div className="meal-details">
            <h4>{meal.title}</h4>
            <p><strong>Kalorien (kcal): </strong>{meal.kcal}</p>
            <p><strong>Gelegenheit: </strong>{meal.occasion}</p>
            <p>{formatDistanceToNow(new Date(meal.createdAt), { addSuffix: true })}</p>
        <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
        </div>
    )
}

export default MealDetails