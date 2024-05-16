import OccasionMealsComponent from '../components/OccasionMealsComponent';
import SearchBar from '../components/SearchBar';
import Navbar from "../components/Navbar";

const OccasionMeals = () => {

    return (
        <div>
            <SearchBar />
            <OccasionMealsComponent />
            <Navbar />
        </div>
    )
}

export default OccasionMeals