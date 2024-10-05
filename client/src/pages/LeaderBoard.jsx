import axios from 'axios';
import React, { useEffect, useState } from 'react';

const LeaderBoard = () => {
    const myIP = import.meta.env.VITE_MY_IP;
    const [data, setData] = useState([]);
    const [user_data, setUser_data] = useState('');
    const [user_rank, setUser_rank] = useState(0);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const user_id = storedUser.user_id;
        axios.get(`http://${myIP}:3000/leaderboard`)
            .then(response => {
                const users = response.data;
                const currentUser = users.find((user) => user.user_id === user_id);
                setUser_data(currentUser);
                setUser_rank(users.findIndex((user) => user.user_id === user_id) + 1);
                setData(users);
            })
            .catch(error => {
                console.error('Error fetching leaderboard data:', error);
            });
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-start bg-blue-50 pt-12">
            <div className="w-11/12 max-w-6xl flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-6 mb-4">
                <h2 className="text-4xl text-gray-800 font-bold mb-6">Leaderboard</h2>

                {/* Make the table responsive */}
                <div className="w-full overflow-x-auto">
                    <table className="table-auto w-full bg-white rounded-lg shadow-lg">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-6 py-3 text-center font-semibold uppercase">Rank</th>
                                <th className="px-6 py-3 text-center font-semibold uppercase">User</th>
                                <th className="px-6 py-3 text-center font-semibold uppercase">Username</th>
                                <th className="px-6 py-3 text-center font-semibold uppercase">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.slice(0, 5).map((user, index) => (
                                <tr key={index} className="hover:bg-blue-100 transition-colors">
                                    <td className="px-6 py-4 text-center">{index + 1}</td>
                                    <td className="px-6 py-4 flex items-center justify-center text-center">
                                        <img
                                            src={user.profilePic}
                                            alt={`${user.username} Profile`}
                                            className="w-10 h-10 rounded-full mr-4"
                                        />
                                        {user.first_name} {user.last_name}
                                    </td>
                                    <td className="px-6 py-4 text-center">{user.username}</td>
                                    <td className="px-6 py-4 text-center">{user.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {user_data && (
                <div className="w-full bg-blue-600 text-white flex items-center justify-around py-6">
                    <img src={user_data.profilePic} alt={`${user_data.username} Profile`} className="w-20 h-20 rounded-full border-4 border-white" />
                    <div className="flex flex-col items-center">
                        <span className="text-xl font-bold">{user_data.first_name} {user_data.last_name}</span>
                        <span className="text-lg">Rank: {user_rank}</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-xl">{user_data.points} Points</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeaderBoard;
