import React from 'react';
import {
  BrowserRouter as Router,
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";

import SignIn from './Components/SignIn';
import Dashboard from './Components/Dashboard';

function App() {
  return (
        <BrowserRouter>
          <Switch>
            <Route path={"/"} exact component={SignIn} />
            <Route path={"/dashboard"} exact component={Dashboard} />
          </Switch>
        </BrowserRouter>
  );
}

export default App;
