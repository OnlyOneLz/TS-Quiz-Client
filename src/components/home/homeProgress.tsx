import React, { useState } from 'react';
import SimulateProgress from '../quiz/simulateProgress';
import { HomeProgressProps, anyProgress } from '../../types';

const HomeProgress: React.FC<HomeProgressProps> = ({ prop, preLevelProgressNum, upLevel }) => {
    const previousProgressNeeded: anyProgress = parseInt(localStorage.getItem('previous_progress_needed') || '0');
    const progressNeeded: anyProgress = parseInt(localStorage.getItem('progress_needed') || '0');
    const progressCalc = (progressNeeded - previousProgressNeeded) / 100;

    const [progress, setProgress] = useState<anyProgress>(() => {
        let storedProgress: anyProgress = parseInt(localStorage.getItem('progress') || '0');
        storedProgress = (storedProgress - previousProgressNeeded) / progressCalc;
        return storedProgress ? storedProgress : 0;
    });

    const [preLevelProgress, setPreLevelProgress] = useState<anyProgress>(() => {
        let storedProgress: anyProgress = preLevelProgressNum;
        storedProgress = ((storedProgress || 0) - previousProgressNeeded) / progressCalc;
        return storedProgress ? storedProgress : 0;
    });

    let level: anyProgress = parseInt(localStorage.getItem('level') || '0');

    return (
        <SimulateProgress
            preLevelProgress={preLevelProgress}
            progress={progress}
            progressNeeded={progressNeeded}
            upLevel={upLevel}
            prop={prop}
            level={level}
        />
    );
};

export default HomeProgress;
