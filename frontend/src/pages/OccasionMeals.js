import OccasionMealsComponent from '../components/OccasionMealsComponent';
import SearchBar from '../components/SearchBar';
import Navbar from "../components/Navbar";
import Head from "../components/Head";

const OccasionMeals = () => {

    return (
        <div>
            <Head />
            <SearchBar />
            <OccasionMealsComponent />
            <Navbar />
        </div>
    )
}

export default OccasionMeals