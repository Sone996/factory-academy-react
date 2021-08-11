import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Scroll from '../../Components/Shared/Scroll';
import SimpleTable from '../../Components/Shared/SimpleTable';
import { personService } from '../../store/PersonModule/person.service';

const StudentHome = () => {

    const titles = ['Id', 'Course Name', 'Teacher Name', 'Average Mark', 'Price'];
    const [courses, setCourses] = useState([]);
    const history = useHistory();

    const parsenotCompletedCourses = (notCompletedCourses) => {
        notCompletedCourses.forEach((course, i) => {
            notCompletedCourses[i] = {
                course_id: notCompletedCourses[i].course_id,
                course_name: notCompletedCourses[i].course_name,
                teacher_name: notCompletedCourses[i].teacher_name,
                average_mark: notCompletedCourses[i].average_mark,
                price: notCompletedCourses[i].price
            }
        })
        setCourses(notCompletedCourses);
    }

    const fetchCourese = () => {
		personService.fetchNotCompletedCourses().then( res => {
            if(res.data.length > 0) {
                parsenotCompletedCourses(res.data);
            }
        }).catch( err => {
            console.log(err.response.data.errors);
        });
    }

    const singleView = (item) => {
        history.push({ pathname: `/single-course/${item.course_id}` });
    }

    useEffect(() => {
        fetchCourese();
    }, [])

    return (
        <div className="student-home flex-col flex w-full">
		<div className="flex border-b py-4 px-4 w-full text-xl font-bold">
			<span>Courses List</span>
		</div>
		<div className="flex w-full h-full py-16 pl-5">
            <div className="relative h-full w-3/4">
                <Scroll>
			        <SimpleTable singleView={singleView} model={courses} titles={titles} />
                </Scroll>
            </div>
		</div>
	</div>
    )
}

export default StudentHome;