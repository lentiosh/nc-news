import { useEffect, useState } from 'react';
import { getAllUsers } from '../utils/api';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllUsers()
            .then(fetchedUsers => {
                setUsers(fetchedUsers);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) return <div>Loading users...</div>;
    if (error) return <div>Error loading users: {error}</div>;

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {users.map(user => (
                <div key={user.username} className="card bg-white p-3 rounded shadow">
                    <img src={user.avatar_url} alt={user.name} className="w-full h-32 object-cover rounded" />
                    <div className="mt-2">
                        <h3 className="font-bold">{user.name}</h3>
                        <p className="text-gray-600">@{user.username}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UsersList;
