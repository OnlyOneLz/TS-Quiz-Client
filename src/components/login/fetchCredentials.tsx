export const fetchCredentials = async (userId: number) => {
    try {
        const response = await fetch(`http://localhost:4001/user/get-one-user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('user_id', data.data.id);
            localStorage.setItem('progress', data.data.progress);
            localStorage.setItem('level', data.data.level);
        }
    } catch (error) {
        console.error('Error adding message', error);
    }
};

export default fetchCredentials;
