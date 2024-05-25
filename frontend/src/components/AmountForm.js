import {useState} from "react"
import { useMealsContext } from '../hooks/useMealsContext'  //?
//import { nutritionCalculator } from '../../backend/controllers/nutritionCalculator'


const AmountForm = (props) => {
    const {dispatch} = useMealsContext()
    const [barcode, setBarcode] = useState('')
    const [quantityEaten, setQuantityEaten] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const [json, setJson] = useState({})

    const handleSubmit = async (e) => {
        console.log('call');
        e.preventDefault()

        const AmountCheck = {barcode, quantityEaten}

        const response = await fetch('http://localhost:5000/api/nutriCalc/' + barcode + '/' + quantityEaten, {
            method: 'GET'
        }, [dispatch])    

        const json = await response.json()
        console.log(json.energy);
        setJson(json);
    }
    
    return (
        <div>

            <form className="create" onSubmit={handleSubmit}>
                
                <label>Barcode</label>
                <input 
                    type="text"
                    onChange={(e) => setBarcode(e.target.value)}
                    value={barcode}
                    className={emptyFields.includes('barcode') ? 'error' : ''}
                />

                <label>Quantity Eaten</label>
                <input 
                    type="number"
                    onChange={(e) => setQuantityEaten(e.target.value)}
                    value={quantityEaten}
                    className={emptyFields.includes('quantityEaten') ? 'error' : ''}
                />


                <button>Check</button>
                
                {error && <div className="error">{error}</div>}
                
            </form>

            

            
            <table>
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>energy</td>
                        <td>{json['energy']}</td>
                    </tr>
                    <tr>
                        <td>protein</td>
                        <td>{json['protein']}</td>
                    </tr>
                    <tr>
                        <td>fat</td>
                        <td>{json['fat']}</td>
                    </tr>
                </tbody>
            </table>

            


        </div>
    )
}

export default AmountForm