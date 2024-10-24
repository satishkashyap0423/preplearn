import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import CheckPage from './Pages/CheckPage';
import HomePage from './Pages/HomePage';
import ProfilePage from './Pages/ProfilePage';
import OpenPdfFile from './Pages/OpenPdfFile';
import OnlineHomePage from './Pages/OnlineHomePage';
import FreeCoursePage from './Pages/FreeCoursePage';
import OfflineZoomPage from './Pages/OfflineZoomPage';
import OnlineFreeCoursePage from './Pages/OnlineFreeCoursePage';
import OnlineZoomPage from './Pages/OnlineZoomPage';
const Routes = () => {
  return (
    <Switch>
      <Route path="/OnlineFreeCoursePage" component ={OnlineFreeCoursePage}/>
      <Route path="/OnlineZoomPage" component ={OnlineZoomPage}/>
      <Route path="/OfflineZoomPage" component ={OfflineZoomPage}/>
      <Route path="/FreeCoursePage" component ={FreeCoursePage}/>
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