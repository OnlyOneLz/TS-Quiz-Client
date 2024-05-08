import React, { useEffect, useState } from 'react';
import { UserData, User } from '../../types';

const HomeScoreboard: React.FC = () => {
    const [scoreboardData, setScoreboardData] = useState<User[]>([]);
    const [userData, setUserData] = useState<Record<string, UserData>>();

    useEffect(() => {
        fetchScoreboardData();
    }, []);

    const fetchScoreboardData = async () => {
        try {
            const response = await fetch('http://localhost:4001/scoreboard/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setScoreboardData(data.data);
            const userDataPromises = data.data.map((user: User) => fetchUserData(user.user_id));
            const userDatas = await Promise.all(userDataPromises);
            const userDataMap = Object.fromEntries(userDatas.map((userData, index) => [data.data[index].user_id, userData]));
            setUserData(userDataMap);
        } catch (error) {
            console.log(error, 'failed to fetch');
        }
    };

    const fetchUserData = async (userId: number) => {
        try {
            const response = await fetch(`http://localhost:4001/user/get-one-user/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data: UserData = await response.json();
            return data.data;
        } catch (error) {
            console.log(error, 'failed to fetch');
        }
    };

    return (
        <div className="grid-item-3">
            <div className="grid-temp">
                <div className="grid-item-1 scoreboard-title">scoreboard</div>
                <div className="grid-item-6">TODAYS HIGHEST SCORES:</div>
                <div className="grid-item-7">
                    {scoreboardData.length > 0 &&
                        scoreboardData.map(user => (
                            <div className="scoreboard-scores" key={user.user_id}>
                                <hr />
                                <div>{(userData && userData[user.user_id]?.username) || 'Unknown'}</div>
                                <hr />
                                <div>{user.score}</div>
                                <hr />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default HomeScoreboard;
