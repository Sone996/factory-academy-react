import React, { useContext, useEffect, useState } from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import { AppContext } from '../AppContext';
import { authService } from "../store/AuthModule/AuthService";
import { TOKEN_LS_NAME } from '../constants/constants';
import { personService } from "../store/PersonModule/person.service";
// pages
import TeacherHome from "../Views/Teacher/TeacherHome";
import StudentHome from "../Views/Student/StudentHome";
import Profile from "../Views/Shared/Profile";
import MemberList from "../Views/Teacher/MemberList";
import NewCourse from "../Views/Teacher/NewCourse";
import CourseList from "../Views/Shared/CourseList";
import SingleCourse from "../Views/Shared/SingleCourse";

const AppLayout = () => {

    const { loggedUser, setLoggedUser } = useContext(AppContext);
    const [profileData, setProfileData] = useState({});
    const history = useHistory();

    const goHome = () => {
        if (loggedUser.role === 'teacher') {
            history.push('/teacher-home');
        } else {
            history.push('/student-home');
        }
    }

    const goProfile = () => {
        personService.goProfile(loggedUser.id)
            .then(res => {
                setProfileData(res.data);
                history.push({ pathname: `/profile/${res.data.id}` });
            })
            .catch(err => {
                console.log(err)
            });
    }

    const myStudents = () => {
        history.push('/member-list');
    }

    const newCourseHandler = () => {
        history.push('/new-course');
    }

    const CourseListHandler = () => {
        history.push('/course-list');
    }

    const studentAplications = () => {
        history.push('/student-aplications');
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
        if(localStorage.length === 0) {
            history.push('/login'); 
        } else {
        authService.fetchActiveAccount()
            .then(res => {
                setLoggedUser(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, [])

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
                        loggedUser.role === 'teacher' ?
                            <>
                                <span className="my-2 cursor-pointer" onClick={myStudents}>My Students</span>
                                <span className="my-2 cursor-pointer" onClick={newCourseHandler} > New Course</span >
                                <span className="my-2 cursor-pointer" onClick={CourseListHandler} > Course List</span >
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
                    <Route path="/profile/:id" render={(props) => {
                        return (<Profile {...profileData} />)
                    }} />
                    <Route path="/member-list" component={MemberList} />
                    <Route path="/new-course" component={NewCourse} />
                    <Route path="/course-list" component={CourseList} />
                    <Route path="/single-course/:id" component={SingleCourse} />
                </Switch>
            </div>
        </div >
    );
}

export default AppLayout;