import React from 'react';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import AddReading from './components/AddReading';
import ViewReadingsPage from './components/ViewReadingsPage';
import RegisterPage from './components/RegisterPage';
import ReadingPage from './components/ReadingPage';
import LogoutPage from './components/LogoutPage';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/addreading" component={AddReading} exact />
        <Route path="/viewreadings" component={ViewReadingsPage} exact />
        <Route path="/login" component={LoginPage} exact />
        <Route path="/register" component={RegisterPage} exact />
        <Route path="/readingpage" component={ReadingPage} exact />
        <Route path="/logout" component={LogoutPage} exact />
      </Switch>
    </main>
  );
}

export default App;
