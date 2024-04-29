import React from 'react';
import  HomeProgress  from './homeProgress';
import HomeScoreboard from './homeScoreboard';
import HomeForm from './homeForm';
import HomeLogout from './homeLogout';
import fetchCredentials from '../login/fetchCredentials';
import checkToken from '../../utilities/auth';

function Home() {
    const userId: any = localStorage.getItem('user_id')
    fetchCredentials(userId)
    checkToken()
    return (
        <div className='grid-temp home-page height-full'>
            <header className='grid-item-1'>
                <h1 className='home-title'>Quizzer</h1>
            </header>
            <HomeProgress prop={false}/>
            <HomeScoreboard />
            <HomeForm />
            <HomeLogout />
        </div>
    );
}

export default Home;
