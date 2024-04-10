import {useState} from "react"

import { useMealsContext } from '../hooks/useMealsContext'

const MealForm = () => {
    const {dispatch} = useMealsContext()
    const [title, setTitle] = useState('')
    const [kcal, setKcal] = useState('')
    const [occasion, setOccasion] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const meal = {title, kcal, occasion}

        const response = await fetch('/api/meal', {
            method: 'POST',
            body: JSON.stringify(meal),
            headers: {
                'Content-Type': 'application/json'
            }
        }, [dispatch])

        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setError(null)
            setTitle('')
            setKcal('')
            setOccasion('')
            setEmptyFields('')
            console.log('new meal added', json)
            dispatch( {type: 'CREATE_MEAL', payload: json})
        }
    }
    
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Füge eine neue Mahlzeit hinzu</h3>
            <label>Mahlzeit Titel:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />
            <label>Kalorien in kcal:</label>
            <input 
                type="number"
                onChange={(e) => setKcal(e.target.value)}
                value={kcal}
                className={emptyFields.includes('kcal') ? 'error' : ''}
            />
            <label>Gelegenheit:</label>
            <input 
                type="text"
                onChange={(e) => setOccasion(e.target.value)}
                value={occasion}
                className={emptyFields.includes('occasion') ? 'error' : ''}
            />

            <button>Mahlzeit hinzufügen</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default MealForm