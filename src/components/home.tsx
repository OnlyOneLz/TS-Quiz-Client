import React, { useEffect } from 'react';
import { useAuth } from '../utilities/auth';

function Home() {
    const auth = useAuth();

    return (
        <div>
            hello world
        </div>
    );
}

export default Home;
