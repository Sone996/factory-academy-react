import './App.scss';
import Login from './Pages/Loin';
import AppLayout from './Layouts/appLayout';
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden flex">
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/" component={AppLayout}/>
        </Switch>
      </Router>
      {/* <Login></Login> */}
      {/* <AppLayout /> */}
    </div>
  );
}

export default App;
