import React from 'react';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import AddReadings from './components/AddReadings';
import ViewReadings from './components/ViewReadings';
import AddUserPage from './components/AddUserPage';
import LandingPage from './components/LandingPage';
import LogoutPage from './components/LogoutPage';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/postreadings" component={AddReadings} exact />
        <Route path="/viewreadings" component={ViewReadings} exact />
        <Route path="/login" component={LoginPage} exact />
        <Route path="/adduser" component={AddUserPage} exact />
        <Route path="/landingpage" component={LandingPage} exact />
        <Route path="/logout" component={LogoutPage} exact />
      </Switch>
    </main>
  );
}

export default App;
