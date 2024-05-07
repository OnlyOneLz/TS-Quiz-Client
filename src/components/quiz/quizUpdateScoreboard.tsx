import { UserID } from '../../types';

const updateScoreboard = async (userId: UserID, userScore: number) => {
    try {
        const response = await fetch(`http://localhost:4001/scoreboard/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                userScore: userScore
            })
        });
        const data = await response.json();
        const response2 = await fetch(`http://localhost:4001/user/add-progress`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                userScore: userScore
            })
        });
        const data2 = await response2.json();
        localStorage.setItem('progress_needed', data2.data[0].progressNeeded);
        localStorage.setItem('previous_progress_needed', data2.data[1].previousProgressNeeded);
    } catch (error) {
        console.log(error, 'Failed to get QuizData');
        return null;
    }
};

export default updateScoreboard;
