import React from "react";
import { Button } from "@mui/material";
import checkToken from "../../utilities/auth";

const HomeLogout = () => {

    const handleLogout = () => {
        localStorage.removeItem('token')
        checkToken()
    }

    return (
        <div className='grid-item-5'>
        <Button onClick={() => handleLogout()} className='logout-btn' variant="contained" color="secondary" style={{ border: '3px #b906bf solid ', color: 'black', backgroundColor: '#b906bf'}}>
            Logout
        </Button>
    </div>
    )
}

export default HomeLogout