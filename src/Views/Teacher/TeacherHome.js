import React, { useContext } from "react";
import { AppContext } from '../../AppContext';

const TeacherHome = () => {

    const { loggedUser, setLoggedUser } = useContext(AppContext);

    return (
        <div>TEACHER HOME {loggedUser.name}</div>
    )
}

export default TeacherHome;