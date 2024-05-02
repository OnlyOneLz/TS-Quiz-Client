import React, { useEffect, useState } from 'react';

const HomeProgress = ({ prop }: { prop: any }) => {
    const [progress, setProgress] = useState<number>(() => {
        let storedProgress: any = localStorage.getItem('progress');
        const previousProgressNeeded: any = localStorage.getItem('previous_progress_needed');
        const progressNeeded: any = localStorage.getItem('progress_needed');
        const progressCalc = (parseInt(progressNeeded) - parseInt(previousProgressNeeded)) / 100;
        storedProgress = (parseInt(storedProgress) - parseInt(previousProgressNeeded)) / progressCalc;
        return storedProgress ? parseInt(storedProgress, 10) : 0;
    });

    const level: string | null = localStorage.getItem('level');

    let loading = false;

    useEffect(() => {
        let interval: NodeJS.Timeout;
        const simulateProgress = () => {
            let progressValue = 0;
            interval = setInterval(() => {
                progressValue += 0.1;
                if (progressValue < progress) {
                    setProgress(progressValue);
                } else {
                    loading = true;
                    clearInterval(interval);
                }
            }, 7);
        };

        simulateProgress();
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`${prop ? `quiz-progress-rank-container ${loading ? 'fade-out' : 'fade-in'}` : 'grid-temp grid-item-2'}`}>
            <div className={`${prop ? 'quiz-rank' : 'rank'}`}>Level {level}</div>
            <div className={`${prop ? 'quiz-progress-bar' : 'progress-bar'}`}>
                <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    );
};

export default HomeProgress;
