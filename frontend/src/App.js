import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import * as userActions from './store/viewUser';

import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import UserPage from "./components/UserPage";
import NewImageForm from "./components/NewImageForm";
import ImagePage from "./components/ImagePage";
import EditFormPage from "./components/EditFormPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(userActions.getAllUsers())
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/user/:userId'>
            <UserPage />
          </Route>
          <Route exact path='/image/new'>
            <NewImageForm />
          </Route>
          <Route exact path='/images/:imageId'>
            <ImagePage />
          </Route>
          <Route path='/image/:imageId/edit'>
            <EditFormPage />
          </Route>
          <Route>
            Page Not Found - Here's a link to the home page
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
