import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import CheckPage from './Pages/CheckPage';
import HomePage from './Pages/HomePage';
import ProfilePage from './Pages/ProfilePage';
import OpenPdfFile from './Pages/OpenPdfFile';
import OnlineHomePage from './Pages/OnlineHomePage';
const Routes = () => {
  return (
    <Switch>

      <Route path="/OpenPdfFile" component ={OpenPdfFile}/>
      <Route path="/ProfilePage" component ={ProfilePage}/>
      <Route path="/OnlineHomePage" component ={OnlineHomePage}/>
      <Route path="/HomePage" component ={HomePage}/>
      <Route path="/LoginPage" component ={LoginPage}/>
      <Route path="/" component={CheckPage} />
    </Switch>
  );
};

export default withRouter(Routes);