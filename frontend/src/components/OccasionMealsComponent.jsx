import {useState, useEffect} from "react"

const OccasionMealsComponent = () => {
    const [occasion, setOccasion] = useState('');

    useEffect(() => {
        const occasionFromLocalStorage = localStorage.getItem('occasion');
        setOccasion(occasionFromLocalStorage);
    }, []);

    return (
        <div>
            {occasion}
        </div>
    );
};

export default OccasionMealsComponent