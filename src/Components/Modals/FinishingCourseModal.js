import '../../App.scss';
import React, { useContext, useState } from 'react';
import { AppContext } from '../../AppContext';
import { courseService } from '../../store/CourseModule/course.service';
import { personService } from '../../store/PersonModule/person.service';

const formInterface = {
    courseId: null,
    userId: null,
    teacherId: null,
    complete: true,
}

const FinishingCourseModal = () => {

    const { modal, setModal, loggedUser } = useContext(AppContext);

    const [data, setData] = useState(modal.modalData);
    const [form, setForm] = useState(formInterface);

    const cancel = () => {
        setModal({
            ...modal,
            status: false,
            name: '',
            data: null
        })
    }

    const completeCourse = () => {
        form.courseId = modal.data.course_id;
        form.userId = modal.data.student_id;
        form.teacherId = loggedUser.id;
        courseService.completeCourse(form).then(() => {
            personService.fetchAplicationRequests()
            cancel()
        })
            .catch((err) => {
                console.log(err);
                cancel();
            });
    }

    return (
        <div id="finishing-course-modal" className="course-course-modal rounded-lg w-2/12 h-3/12 bg-gray-400 flex flex-row absolute text-tiny felx items-center justify-center">
            <div className="flex items-center justify-between w-full px-8">
                <span onClick={cancel} className="bg-darkRed py-2 px-4 rounded-lg cursor-pointer">Cancel</span>
                <span onClick={completeCourse} className="bg-darkGreen py-2 px-4 rounded-lg cursor-pointer">Complete</span>
            </div>
        </div>
    );
}

export default FinishingCourseModal;