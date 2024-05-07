import React from 'react';
import HomeProgress from './homeProgress';
import HomeScoreboard from './homeScoreboard';
import HomeForm from './homeForm';
import HomeLogout from './homeLogout';
import fetchCredentials from '../login/fetchCredentials';
import checkToken from '../../utilities/auth';
import { UserID, PreviousLevelProgress } from '../../types';

function Home() {
    const userId: UserID = localStorage.getItem('user_id');
    let preLevelProgress: PreviousLevelProgress = parseInt(localStorage.getItem('previous_progress_needed') || '0', 10);
    fetchCredentials(userId);
    checkToken();
    return (
        <div className="grid-temp home-page height-full">
            <header className="grid-item-1">
                <h1 className="home-title">Quizzer</h1>
            </header>
            <HomeProgress prop={false} preLevelProgressNum={preLevelProgress} upLevel={false} />
            <HomeScoreboard />
            <HomeForm />
            <HomeLogout />
        </div>
    );
}

export default Home;
