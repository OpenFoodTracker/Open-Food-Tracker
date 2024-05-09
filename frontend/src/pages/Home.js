import { useEffect, useState } from 'react';

// components
import UserForm from '../components/UserForm';  // Nutze UserForm statt MealDetails und MealForm

const Home = () => {
    const [userId, setUserId] = useState(''); // Zustand für die Benutzer-ID
    const [userData, setUserData] = useState(null); // Zustand für die Benutzerdaten
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null); // Zustand für Fehlermanagement

    useEffect(() => {
        const fetchUserById = async () => {
            if (userId && !isFetching) {
                setIsFetching(true);
                try {
                    const response = await fetch(`/api/user/${userId}`);
                    const json = await response.json();
                    
                    if (response.ok) {
                        setUserData(json); // Speichert die Daten direkt im Zustand
                        setError(null); // Setzt etwaige Fehler zurück
                    } else {
                        throw new Error('Fehler beim Abrufen des Benutzers');
                    }
                } catch (error) {
                    setError(error.message); // Speichert Fehlermeldungen im Zustand
                    setUserData(null); // Setzt die Benutzerdaten zurück
                } finally {
                    setIsFetching(false);
                }
            }
        };
        
        fetchUserById();
    }, [userId, isFetching]);

    return (
        <div className="home">
            <UserForm />
            {error && <div className="error">{error}</div>}
        </div>
    );
}

export default Home;
