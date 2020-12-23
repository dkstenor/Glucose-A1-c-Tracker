import React from 'react';
import { Redirect } from 'react-router-dom';

function LogoutPage() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');

    return(    
        <Redirect to='/' />
    )
}

export default LogoutPage;