import React, { useContext, useEffect, useState } from 'react';
import { personService } from '../../store/PersonModule/person.service';
import { useHistory } from "react-router-dom";
import { AppContext } from '../../AppContext';
// components
import StudentProfileComponent from '../../Components/Student/StudentProfileComponent';
import TeacherProfileComponent from '../../Components/Teacher/TeacherProfileComponent';


const Profile = (props) => {

	const { loggedUser } = useContext(AppContext);

	const [userData, setUserData] = useState(props);
	const history = useHistory();

	const initLoad = () => {
		let x = history.location.pathname.split("/");
		let id = x[x.length-1];
		personService.goProfile(id).then(res => {
			setUserData(res.data);
		}).catch();
	}

	useEffect(() => {
		initLoad()
    },[history.location.pathname])


    return (
        <div className="profile flex flex-col w-full h-full">
		<div v-if="userData" className="flex flex-col items-start p-6 text-xl border-b">
			<span>Name: {userData.name}</span>
			<span>Surname: {userData.surname}</span>
			<span>Email: {userData.email}</span>
			<span>Role: {userData.role}</span>
		</div>
		<div className="flex flex-col h-full">
			{loggedUser.role === 'teacher' ? <TeacherProfileComponent /> : <StudentProfileComponent /> }
		</div>
	</div>
    );
}

export default Profile;