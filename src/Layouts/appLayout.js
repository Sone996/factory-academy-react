import React, { useContext, useEffect } from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import TeacherHome from "../Views/Teacher/TeacherHome";
import StudentHome from "../Views/Student/StudentHome";
import { AppContext } from '../AppContext';
import { authService } from "../store/AuthModule/AuthService";
import { TOKEN_LS_NAME } from '../constants/constants';

const AppLayout = () => {

    const { loggedUser, setLoggedUser } = useContext(AppContext); 
    const history = useHistory();

    const goHome = () => {
        if (loggedUser.role === 'professor') {
            history.push('/teacher-home');
        } else {
            history.push('/student-home');
        }
    }

    const goProfile = () => {
        history.push('/profile');
    }

    const myStudents = () => {
        history.push('/member-list');
    }

    const newCourse = () => {
        history.push('/new-course');
    }

    const CourseList = () => {
        history.push('course-list');
    }

    const studentAplications = () => {
        history.push('student-aplications');
    }

    const logout = () => {
        authService.logout()
        .then((res) => {
            localStorage.removeItem(TOKEN_LS_NAME);
            history.push('/login');
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        console.log('promena')
        authService.fetchActiveAccount()
        .then(res => {
            setLoggedUser(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[])

    return (
        <div className="flex w-full h-full">
            <div className="flex flex-col h-full bg-gray-500 w-2/12">
                <div className="flex p-16">
                    <img src="../assets/images/factoryww.png" alt="logo" className="cursor-pointer" onClick={goHome} />
                </div>
                <div className="flex flex-col text-white font-bold text-lg">
                    <span className="my-2 cursor-pointer" onClick={goHome}>Home</span>
                    <span className="my-2 cursor-pointer" onClick={goProfile}>Profile</span>
                    {
                        loggedUser.role === 'professor' ?
                            <>
                                <span className="my-2 cursor-pointer" onClick={myStudents}>My Students</span>
                                <span className="my-2 cursor-pointer" onClick={newCourse} > New Course</span >
                                <span className="my-2 cursor-pointer" onClick={CourseList} > Course List</span >
                                <span className="my-2 cursor-pointer" onClick={studentAplications} > Student aplications</span >
                            </>
                            :
                            <></>
                    }
                    <span className="my-2 cursor-pointer" onClick={logout} > Logout</span >
                </div >
            </div >
            <div className="flex w-full">
                <Switch>
                    <Route path="/teacher-home" component={TeacherHome} />
                    <Route path="/student-home" component={StudentHome} />
                </Switch>
            </div>
        </div >
    );
}

export default AppLayout;