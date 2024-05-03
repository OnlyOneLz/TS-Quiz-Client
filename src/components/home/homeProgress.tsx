import React, { useState } from 'react';
import SimulateProgress from '../quiz/simulateProgress';

const HomeProgress: React.FC<any> = ({ prop, preLevelProgressNum, upLevel }: { prop: any; preLevelProgressNum: number; upLevel: boolean }) => {
    const previousProgressNeeded: any = localStorage.getItem('previous_progress_needed');
    const progressNeeded: any = localStorage.getItem('progress_needed');
    const progressCalc = (parseInt(progressNeeded) - parseInt(previousProgressNeeded)) / 100;
    console.log(progressCalc);

    const [progress, setProgress] = useState<number>(() => {
        let storedProgress: any = localStorage.getItem('progress');
        storedProgress = (parseInt(storedProgress) - parseInt(previousProgressNeeded)) / progressCalc;
        return storedProgress ? parseFloat(storedProgress) : 0;
    });

    const [preLevelProgress, setPreLevelProgress] = useState<number>(() => {
        let storedProgress: any = preLevelProgressNum;
        storedProgress = (parseInt(storedProgress) - parseInt(previousProgressNeeded)) / progressCalc;
        return storedProgress ? parseFloat(storedProgress) : 0;
    });

    console.log(progress, preLevelProgressNum, preLevelProgress);

    let level: any = localStorage.getItem('level');
    level = parseInt(level);

    return <SimulateProgress preLevelProgress={preLevelProgress} progress={progress} upLevel={upLevel} prop={prop} level={level} />;
};

export default HomeProgress;
