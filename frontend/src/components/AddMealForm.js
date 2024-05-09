import {useState} from "react"

import { useMealsContext } from '../hooks/useMealsContext'

const AddMealForm = () => {
    const {dispatch} = useMealsContext()
    const [userId, setuserId] = useState('')
    const [mealId, setmealId] = useState('')
    const [occasion, setOccasion] = useState('')
    const [amount, setAmount] = useState('')
    const [error, setError] = useState(null)
    //const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const meal = {userId, mealId, occasion, amount}

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
            //setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setError(null)
            setuserId('')
            setmealId('')
            setOccasion('')
            setAmount('')
            //setEmptyFields('')
            console.log('new meal added', json)
            //dispatch( {type: 'CREATE_MEAL', payload: json})
        }
    }
    
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Füge eine neue Mahlzeit hinzu</h3>
            <label>User ID:</label>
            <input 
                type="text"
                onChange={(e) => setuserId(e.target.value)}
                value={userId}
                //className={emptyFields.includes('userId') ? 'error' : ''}
            />
            <label>Mahlzeit ID:</label>
            <input 
                type="text"
                onChange={(e) => setmealId(e.target.value)}
                value={mealId}
                //className={emptyFields.includes('mealId') ? 'error' : ''}
            />
            <label>Gelegenheit:</label>
            <input 
                type="text"
                onChange={(e) => setOccasion(e.target.value)}
                value={occasion}
                //className={emptyFields.includes('occasion') ? 'error' : ''}
            />
            <label>Menge:</label>
            <input 
                type="text"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                //className={emptyFields.includes('amount') ? 'error' : ''}
            />

            <button>Mahlzeit hinzufügen</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default AddMealForm