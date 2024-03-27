import React, { useEffect, useState }from "react"

const HomeProgress = () => {
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

    return (
        <div className='grid-item-2 grid-temp'>
        <div className='rank'>{level}</div>
        <div className='progress-bar'>
            <div className='progress' style={{ width: `${progress}%` }}></div>
        </div>
    </div>
    )
}

export default HomeProgress