import React from 'react';
import { Redirect } from 'react-router-dom';

function LogoutPage() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');

    return(    
        <Redirect to='/' />
    )
}

export default LogoutPage;