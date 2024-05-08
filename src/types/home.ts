// Home Types

export type Category = 'Programming Languages' | 'Databases' | 'Web Development' | 'Software Development Lifecycle' | 'Random';

export interface User {
    data: object;
    score: number;
    user_id: number;
}

export interface UserData {
    data: object;
    username: string;
}
