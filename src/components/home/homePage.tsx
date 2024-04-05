import React from 'react';
import  HomeProgress  from './homeProgress';
import HomeScoreboard from './homeScoreboard';
import HomeForm from './homeForm';
import HomeLogout from './homeLogout';

function Home() {

    return (
        <div className='grid-temp home-page height-full'>
            <header className='grid-item-1'>
                <h1 className='home-title'>Quizzer</h1>
            </header>
            <HomeProgress />
            <HomeScoreboard />
            <HomeForm />
            <HomeLogout />
        </div>
    );
}

export default Home;
