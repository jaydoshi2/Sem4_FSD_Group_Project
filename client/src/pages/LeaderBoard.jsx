    import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/LeaderBoard.css'; // Custom CSS for styling

const LeaderBoard = () => {
    // State to store the leaderboard data
    const myIP = import.meta.env.VITE_MY_IP;
    const [data, setData] = useState([]);
    const [username, setUsername] = useState("john_doe");
    const user_data = data.find((user) => user.username === username);
    // Find the rank (index) of the user
    const rank = data.findIndex((user) => user.username === username) + 1;
    // Fetch data when the component mounts
    useEffect(() => {
        axios.get(`http://${myIP}:3000/leaderboard`)
      .then(response => {
            // Store the fetched data in state
            setData(response.data);
        })
            .catch(error => {
                console.error('Error fetching leaderboard data:', error);
            });
    }, []); // Empty dependency array means this effect runs once when the component mounts

    // Assuming the first user in the array is the one whose details are shown at the bottom
    return (
        <div className="main-container">
            <div className="leaderboard-container">
                <h2 className="leaderboard-title">Leaderboard</h2>
                <div className="table-container">
                    <table className="leaderboard-table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Points</th>
                                <th>Accuracy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.slice(0, 5).map((user, index) => (
                                <tr key={index} className="leaderboard-row">
                                    <td><img src={user.profilePic} alt={`${user.username} Profile`} className="profile-pic" />{user.username}</td>
                                    <td>{user.points}</td>
                                    <td>{user.accuracy}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>

            {user_data && (
                <div className="leaderboard-personal-detail">
                    <img src={`user_data.profilePic`} alt={`${username} Profile`} />
                    <div>
                        <span>{username}</span>
                        <span>Rank: {rank}</span>
                    </div>
                    <div>
                        <span>{user_data.points} Points</span>
                    </div>
                    <div>
                        <span>Accuracy: {user_data.accuracy}%</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeaderBoard;