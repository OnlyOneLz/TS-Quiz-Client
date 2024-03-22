import React, { useEffect, useState } from 'react';
import { useAuth } from '../utilities/auth';
import { FormControl, Select, MenuItem, InputLabel, SelectChangeEvent, Button } from '@mui/material';

function Home() {
    const auth = useAuth();
    const [category, setCategory] = useState<string>('');
    const [progress, setProgress] = useState<number>(() => {
        const storedProgress = localStorage.getItem('progress');
        return storedProgress ? parseInt(storedProgress, 10) : 0;
    });
    const level: string | null = localStorage.getItem('level');

    useEffect(() => {
        let interval: NodeJS.Timeout;
        const simulateProgress = () => {
            let progressValue = 0;
            interval = setInterval(() => {
                progressValue += 0.1;
                if (progressValue < progress) {
                    setProgress(progressValue);
                } else {
                    clearInterval(interval);
                }
            }, 10);
        };

        simulateProgress();
        return () => clearInterval(interval);
    }, []);

    const handleChange = (event: SelectChangeEvent<string>) => {
        setCategory(event.target.value);
    };

    return (
        <div className='grid-temp home-page height-full'>
            <header className='grid-item-1'>
                <h1 className='home-title'>Quizzer</h1>
            </header>
            <div className='grid-item-2 grid-temp'>
                <div className='rank'>{level}</div>
                <div className='progress-bar'>
                    <div className='progress' style={{ width: `${progress}%` }}></div>
                </div>
            </div>
            <div className='grid-item-3'>
                <div className='grid-temp'>
                    <div className='grid-item-1 scoreboard-title'>scoreboard</div>
                </div>
            </div>
            <div className='grid-item-4'>
                <form className='quiz-selecion'>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label">category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Category"
                            onChange={handleChange}
                            style={{ border: '3px black solid' }}
                        >
                            <MenuItem value={'react'}>React</MenuItem>
                            <MenuItem value={'typeScript'}>Typescript</MenuItem>
                            <MenuItem value={'random'}>Random</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="secondary" style={{ border: '3px black solid ', color: 'white', backgroundColor: 'black', marginTop: '1rem' }}>
                        Start Quiz!
                    </Button>
                </form>
            </div>
            <div className='grid-item-5'>
                <Button className='logout-btn' variant="contained" color="secondary" style={{ border: '3px #b906bf solid ', color: 'black', backgroundColor: '#b906bf'}}>
                    Logout
                </Button>
            </div>
        </div>
    );
}

export default Home;
