import { rmSync } from 'fs';
import React, {useState, useEffect} from 'react';
import Scroll from '../../Components/Shared/Scroll';
import SimpleTable from '../../Components/Shared/SimpleTable';
import { courseService } from '../../store/CourseModule/course.service';

const CourseList = () => {

    const titles = ['Id', 'Name', 'Average Mark', 'Price'];
    const [model, setModel] = useState([]);

    const singleView = () => {
        console.log('single view')
    }

    const parseAllCourses = (data) => {
        let allCouresList = data;
        allCouresList.forEach((student, i) => {
            allCouresList[i] = {
               id: allCouresList[i].id,
               name: allCouresList[i].name,
               average_mark: allCouresList[i].average_mark,
               price: allCouresList[i].price
           }
        });
        setModel(allCouresList);
    }

    const fetchCourses = () => {
        courseService.fetchAllCourses()
        .then(res => {
            if(res.data.length > 0) {
                parseAllCourses(res.data);
            }
        }
        ).catch();
    }

    useEffect(() => {
        fetchCourses();
    },[])

    return (
        <div className="professor-home flex-col flex w-full">
		<div className="flex border-b py-4 px-4 w-full text-xl font-bold">
			<span>All Courses</span>
		</div>
		<div className="flex w-full h-full py-16 pl-5">
            <div className="relative h-full w-3/4">
                <Scroll>
			        <SimpleTable singleView={singleView} model={model} titles={titles}></SimpleTable>
                </Scroll>
            </div>
		</div>
	</div>
    );
}

export default CourseList;