import { API_URL } from '../../config';
import { UserID } from '../../types';

export const fetchCredentials = async (userId: UserID) => {
    try {
        const response = await fetch(`${API_URL}/user/get-one-user/${userId}`, {
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
