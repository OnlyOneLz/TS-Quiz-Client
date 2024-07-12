import React, { useState, useEffect } from 'react';
import { SimulateProgressProps, anyProgress } from '../../types';

const SimulateProgress: React.FC<SimulateProgressProps> = ({ preLevelProgress, progress, progressNeeded, upLevel, prop, level }) => {
    const [currentProgress, setCurrentProgress] = useState<anyProgress>(preLevelProgress);
    const [animateTo, setAnimateTo] = useState<anyProgress>(progress);
    const [currentlevel, setCurrentLevel] = useState<anyProgress>(level);
    const [shouldFadeOut, setShouldFadeOut] = useState<boolean>(false);

    const progressValue: anyProgress = parseInt(localStorage.getItem('progress') || '0');

    useEffect(() => {
        if (upLevel) {
            setCurrentProgress(preLevelProgress);
            setAnimateTo(100);

            setTimeout(() => {
                setCurrentLevel(level! + 1);
                setCurrentProgress(0);
                setAnimateTo(progress);
            }, 5000);
        } else {
            setAnimateTo(progress);
        }
    }, [preLevelProgress, progress, upLevel]);

    useEffect(() => {
        const animationDuration = 400;

        const startTime = Date.now();

        const animate = () => {
            const elapsedTime = Date.now() - startTime;
            const percentageComplete = Math.min(1, elapsedTime / animationDuration);
            const newProgress = currentProgress! + (animateTo! - currentProgress!) * percentageComplete;
            setCurrentProgress(newProgress);

            if (percentageComplete < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);

        if (Math.floor(currentProgress || 0) === Math.floor(animateTo || 0)) {
            setTimeout(() => {
                setShouldFadeOut(true);
            }, 3000);
        } else {
            setShouldFadeOut(false);
        }
    }, [currentProgress]);

    if (shouldFadeOut) {
        localStorage.setItem('alreadyLoaded', 'true');
    } else {
        localStorage.setItem('points', '0');
    }
    return (
        <>
            {prop ? (
                <div className={`final-page-progress-points-container ${shouldFadeOut ? 'fade-out' : ''}`}>
                    <div className="quiz-progress-rank-container">
                        <div className="quiz-rank">Level {upLevel ? currentlevel! - 1 : currentlevel}</div>
                        <div className="quiz-progress-bar">
                            <div className="progress" style={{ width: `${currentProgress}%` }}></div>
                        </div>
                        <p>Points needed till next level: {Math.floor((progressNeeded || 0) - (progressValue || 0))}</p>
                    </div>
                </div>
            ) : (
                <div className="grid-temp grid-item-2">
                    <div className="rank">Level {upLevel ? currentlevel! - 1 : currentlevel}</div>
                    <div className="progress-bar">
                        <div className="progress" style={{ width: `${currentProgress}%` }}></div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SimulateProgress;
