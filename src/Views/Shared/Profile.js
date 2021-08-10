import React, { useEffect, useState } from 'react';
import { personService } from '../../store/PersonModule/person.service';
import { useHistory } from "react-router-dom";


const Profile = (props) => {

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
			{/* <Teacher-profile-component v-if="loggedUser.role === 'teacher'"></Teacher-profile-component>
			<Student-profile-component v-else></Student-profile-component> */}
		</div>
	</div>
    );
}

export default Profile;