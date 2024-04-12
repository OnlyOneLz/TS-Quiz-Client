import React from "react";
import { Button } from "@mui/material";
import checkToken from "../../utilities/auth";

const HomeLogout = () => {

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        localStorage.removeItem('progress')
        localStorage.removeItem('level')
        checkToken()
    }

    return (
        <div className='grid-item-5'>
        <button onClick={() => handleLogout()} className='logout-btn'>
            Logout
        </button>
    </div>
    )
}

export default HomeLogout