import './App.scss';
import Login from './Pages/Loin';
import AppLayout from './Layouts/appLayout';
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppContext } from './AppContext';

function App() {

  const [loggedUser, setLoggedUser] = useState({});
  return (
    <AppContext.Provider value={{ loggedUser, setLoggedUser }}>
      <div className="relative w-screen h-screen overflow-hidden flex">
        <Router>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/" component={AppLayout} />
          </Switch>
        </Router>
        {/* <Login></Login> */}
        {/* <AppLayout /> */}
      </div>
    </AppContext.Provider>
  );
}

export default App;
