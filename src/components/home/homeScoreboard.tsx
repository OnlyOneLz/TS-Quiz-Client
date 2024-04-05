import React, { useEffect, useState } from "react";

interface User {
    data: object
    score: number
    user_id: number
}

interface UserData {
    data: object
    username: string;
}

const HomeScoreboard: React.FC = () => {
    const [scoreboardData, setScoreboardData] = useState<User[]>([]);
    const [userData, setUserData] = useState<Record<string, UserData>>({});

    useEffect(() => {
        fetchScoreboardData();
    }, []);

    const fetchScoreboardData = async () => {
        try {
            const response = await fetch('http://localhost:4001/scoreboard/all', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await response.json();
            setScoreboardData(data.data);
            console.log(data.data);

            const userDataPromises = data.data.map((user: User) => fetchUserData(user.user_id));
            const userDatas = await Promise.all(userDataPromises);
            console.log(userDatas);
            const userDataMap = Object.fromEntries(userDatas.map((userData, index) => [data.data[index].userId, userData]));
            setUserData(userDataMap);
            console.log(userData);
        } catch (error) {
            console.log(error, 'failed to fetch');
        }
    };
    
    const fetchUserData = async (userId: number) => {
        console.log(userId);
        try {
            const response = await fetch(`http://localhost:4001/user/get-one-user/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data: UserData = await response.json(); 
            console.log(data);
            
            return data.data;
        } catch (error) {
            console.log(error, 'failed to fetch');
        }
    };

    return (
        <div className='grid-item-3'>
            <div className='grid-temp'>
                <div className='grid-item-1 scoreboard-title'>scoreboard</div>
                <div className="grid-item-6">TODAYS HIGHEST SCORES:</div>
                <div className="grid-item-7">
                    {scoreboardData.length > 0 &&
                        scoreboardData.map(user => (
                            <div key={user.user_id}>
                                <div>{userData[user.user_id]?.username}</div>
                                <div>{user.score}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default HomeScoreboard;
