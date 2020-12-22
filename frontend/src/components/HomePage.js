import React from 'react';
import PageHeader from './PageHeader';
import LoginPage from './LoginPage';

function HomePage(){
    return(
        <>
        <PageHeader>
            Welcome
        </ PageHeader>
        <LoginPage>
            Log In
        </LoginPage>
        </>
    )
}

export default HomePage;