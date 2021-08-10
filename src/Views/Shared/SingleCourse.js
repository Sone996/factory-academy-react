import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../AppContext';
import { useHistory } from 'react-router-dom';
import { courseService } from '../../store/CourseModule/course.service';
// components
import SingleCourseComponent from '../../Components/Teacher/SingleCourseComponent';
import SingleCourseStudentComponent from '../../Components/Student/SingleCourseStudentComponent';

const courseInterface = {
    name: '',
    price: '',
    description: '',
}

const SingleCourse = () => {

    const { loggedUser, setLoggedUser } = useContext(AppContext);
    const [course, setCourse] = useState(courseInterface);
    const [studentsOnCourseList, setStudentsOnCourse] = useState([]);
    const history = useHistory();

    const parseStudentsOnCourse = (studentsOnCourseList) => {

        studentsOnCourseList.forEach((student, i) => {
            studentsOnCourseList[i] = {
                id: studentsOnCourseList[i].user_id,
                user: studentsOnCourseList[i].user,
                course_start_date: studentsOnCourseList[i].course_start_date,
                complete: studentsOnCourseList[i].complete
            }
        })
        setStudentsOnCourse(studentsOnCourseList);
    }

    const studentsOnCourse = (id) => {
        courseService.studentsOnCourse({ course_id: id })
            .then(res => {
                parseStudentsOnCourse(res.data)
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
                        <SingleCourseComponent tableData={studentsOnCourseList}></SingleCourseComponent>
                    </div>
                    :
                    <div className="flex flex-col items-center w-full">
                        <SingleCourseStudentComponent data={course}></SingleCourseStudentComponent>
                    </div>
            }
        </div>
    );
}

export default SingleCourse;