import { useState } from "react";

const UserForm = () => {
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const fetchUser = async (e) => {
        e.preventDefault();

        const response = await fetch(`/api/user/${userId}`);

        const data = await response.json();

        if (!response.ok) {
            setError('Fehler beim Abrufen des Benutzers');
        } else {
            setUser(data);
            setError(null);
        }
    }

    return (
        <form className="fetch-user" onSubmit={fetchUser}>
            <h3>Benutzer abrufen</h3>
            <label>Benutzer-ID:</label>
            <input
                type="text"
                onChange={(e) => setUserId(e.target.value)}
                value={userId}
                className={error ? 'error' : ''}
            />
            <button>Benutzer suchen</button>
            {error && <div className="error">{error}</div>}
            {user && <div>
                <p>userID: {user.userId}</p>
                <p>gender: {user.gender}</p>
                <p>height: {user.height}</p>
                <p>weight: {user.weight}</p>
                <p>goal: {user.goal}</p>
            </div>}
        </form>
    )
}

export default UserForm;
