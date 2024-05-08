import { UserID, anyProgress } from '../../types';

export const updateProgress = async (userId: UserID, points: anyProgress) => {
    const oldProgress: anyProgress = parseInt(localStorage.getItem('progress') || '0');

    try {
        const response = await fetch(`http://localhost:4001/user/add-progress`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                userScore: points
            })
        });
        const data = await response.json();

        if (response.ok) {
            return {
                progressNeeded: data.data[0],
                previousProgressNeeded: data.data[1],
                level: data.data[2]
            };
        }
    } catch (error) {
        console.log(error, 'Failed to update progress');
    }
};

export default updateProgress;
