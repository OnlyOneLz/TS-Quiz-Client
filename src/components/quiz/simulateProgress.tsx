import React, { useState, useEffect } from 'react';

interface SimulateProgressProps {
    preLevelProgress: number;
    progress: number;
    upLevel: boolean;
    prop: boolean;
    level: number;
}

const SimulateProgress: React.FC<SimulateProgressProps> = ({ preLevelProgress, progress, upLevel, prop, level }) => {
    const [currentProgress, setCurrentProgress] = useState<number>(preLevelProgress);
    const [animateTo, setAnimateTo] = useState<number>(progress);
    const [currentlevel, setCurrentLevel] = useState<number>(level);

    console.log(level);

    useEffect(() => {
        if (upLevel) {
            setCurrentProgress(preLevelProgress);
            setAnimateTo(100);
            console.log(progress);

            setTimeout(() => {
                setCurrentLevel(level + 1);
                setCurrentProgress(0);
                setAnimateTo(progress);
            }, 5000);
        } else {
            setAnimateTo(progress);
        }
    }, [preLevelProgress, progress, upLevel]);

    useEffect(() => {
        const animationDuration = 500;

        const startTime = Date.now();

        const animate = () => {
            const elapsedTime = Date.now() - startTime;
            const percentageComplete = Math.min(1, elapsedTime / animationDuration);
            const newProgress = currentProgress + (animateTo - currentProgress) * percentageComplete;
            setCurrentProgress(newProgress);

            if (percentageComplete < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [currentProgress, animateTo]);

    return (
        <div className={`${prop ? `quiz-progress-rank-container fade-in` : 'grid-temp grid-item-2'}`}>
            <div className={`${prop ? 'quiz-rank' : 'rank'}`}>Level {upLevel ? currentlevel - 1 : currentlevel}</div>
            <div className={`${prop ? 'quiz-progress-bar' : 'progress-bar'}`}>
                <div className="progress" style={{ width: `${currentProgress}%` }}></div>
            </div>
        </div>
    );
};

export default SimulateProgress;
