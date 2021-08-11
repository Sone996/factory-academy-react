import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../AppContext';
import Scroll from '../../Components/Shared/Scroll';
import SimpleTable from '../../Components/Shared/SimpleTable';
import { personService } from '../../store/PersonModule/person.service';

const StudentProfileComponent = () => {

    const { loggedUser } = useContext(AppContext);
    const [courses, setCourses] = useState([]);
    const titles = ['Id', 'Course Name', 'Mark'];

    const parseCompletedCourses = (completedCourses) => {
        completedCourses.forEach((course, i) => {
            completedCourses[i] = {
                course_id: completedCourses[i].course.id,
                course_name: completedCourses[i].course.name,
                mark: completedCourses[i].mark,
            }
        })
        setCourses(completedCourses);
    }

    const fetchCompletedCourese = () => {
        let id = loggedUser.id;
        personService.fetchCompletedCourses(id).then(res => {
            parseCompletedCourses(res.data);
        }).catch(err => {
            console.log(err.response.data.errors);
        }
        );
    }

    useEffect(() => {
        if(loggedUser.id) {
            fetchCompletedCourese();
        }
    }, [loggedUser])


    return (
        <div className="user-profile-component flex flex-col h-full">
            <div className="flex flex-col text-xl h-full pt-6">
                <div className="flex pl-6">
                    <span>My Completed Courses</span>
                </div>
                <div className="flex flex-col justify-center h-full p-16">
                    <div className="relative h-full w-full">
                        <Scroll>
                            <SimpleTable model={courses} titles={titles} />
                        </Scroll>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentProfileComponent;