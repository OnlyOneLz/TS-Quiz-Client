export const updateProgress = async (userId: any, points: any) => {
    const oldProgress: any = localStorage.getItem('progress');
    console.log(oldProgress, points);

    try {
        const response = await fetch(`http://localhost:4001/user/add-progress`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                userScore: parseInt(points)
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
