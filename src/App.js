import './App.scss';
import Login from './Pages/Login';
import AppLayout from './Layouts/appLayout';
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppContext } from './AppContext';
// modals
import FinishingCourseModal from './Components/Modals/FinishingCourseModal';
import RequestAcceptModal from './Components/Modals/RequestAcceptModal';
import RateCourse from './Components/Modals/RateCourse';
import NotificationModal from './Components/Modals/NotificationModal';

function App() {

  const [loggedUser, setLoggedUser] = useState({});
  const [modal, setModal] = useState({
    status: false,
    modalName: '',
    data: {}
  });

  const modalSwitch = prop => {
    switch (prop) {
      case 'finishing-course-modal':
        return <FinishingCourseModal />;
      case 'requrest-accept-modal':
        return <RequestAcceptModal />;
        case 'rate-course':
          return <RateCourse />;
          case 'notification-modal':
            return <NotificationModal />;
      default:
        break;
    }
  }

  return (
    <AppContext.Provider value={{ loggedUser, setLoggedUser, modal, setModal }}>

      <div className="relative w-screen h-screen overflow-hidden flex">

        {/* modals */}
        {
          modal.status
            ?
            <div className="fixed top-0 left-0 h-screen w-screen flex modal">
              <div className="modal-overlay fixed top-0 left-0 modal-overlay h-screen w-screen flex"></div>
              <div className="modal flex items-center justify-center w-full">
                {modalSwitch(modal.modalName)}
                {/* {modal.modalName === 'finishing-course-modal' ? <FinishingCourseModal /> : <></>} */}
              </div>
            </div>
            :
            <></>
        }
        {/* END :: modals */}

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
