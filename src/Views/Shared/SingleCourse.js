import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../AppContext';
import { useHistory } from 'react-router-dom';
import { courseService } from '../../store/CourseModule/course.service';

const courseInterface = {
    name: '',
    price: '',
    description: '',
}

const SingleCourse = () => {

    const { loggedUser, setLoggedUser } = useContext(AppContext);
    const [course, setCourse] = useState(courseInterface);
    const [studentsOnCOurse, setStudentsOnCourse] = useState([]);
    const history = useHistory();

    const studentsOnCourse = (id) => {
        courseService.studentsOnCourse({ course_id: id })
            .then(res => {
                setStudentsOnCourse(res.data);
            })
            .catch()
    }

    const initLoad = () => {
        let x = history.location.pathname.split("/");
        let id = x[x.length - 1];
        courseService.fetchSingleCours(id)
            .then(res => {
                setCourse(res.data)
                studentsOnCourse(id)
            })
            .catch()
    }

    useEffect(() => {
        initLoad();
    }, [])

    return (
        <div className="course flex w-full">
            <div className="flex flex-col w-1/3 items-start py-4 px-4 border-r text-xl font-bold border-b">
                <div className="flex flex-col w-full items-start">
                    <span>Name: {course.name}</span>
                    <span>Price: {course.price}</span>
                </div>
                <div className="flex border whitespace-pre-line h-full overflow-y-auto mb-4">
                    <span>{course.description}</span>
                </div>
            </div>
            {
                loggedUser.role === 'teacher' ?
                    <div className="flex flex-col items-center w-2/3">
                        {/* <My-students-list :tableData='usersOnCourseList'></My-students-list> */}
                    </div>
                    :
                    <div className="flex flex-col items-center w-full">
                        {/* <Student-part :data="course"></Student-part> */}
                    </div>
            }
        </div>
    );
}

export default SingleCourse;