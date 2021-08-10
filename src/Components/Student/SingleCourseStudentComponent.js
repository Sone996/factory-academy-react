import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { courseService } from '../../store/CourseModule/course.service';

const formInterface = {
    id: '',
    comment: '',
}

const SingleCourseStudentComponent = ({ data }) => {

    const [form, setForm] = useState(formInterface);
    const history = useHistory();

    const commentHandler = event => {
        setForm({
            ...form,
            comment: event.target.value
        })
    }

    const buyCourse = () => {
        let x = history.location.pathname.split("/");
        let id = x[x.length - 1];
        setForm({
            ...form,
            id: id
        })
        courseService.buyCourse(form).then(res => {
            setForm(formInterface)
        })
        .catch(err => {
            console.log(err)
        })

    }

    return (
        <div className="single-course-component flex flex-col text-xl w-full">
            <div className="felx flex-col justify-between px-6">
                <div className="flex py-10">
                    <textarea
                        v-model="form.comment"
                        value={form.comment}
                        onChange={commentHandler}
                        className="border resize-none w-full rounded p-3"
                        rows="10"
                        placeholder="Message for professor" />
                </div>
                <div className="flex">
                    <span className="button bg-darkGreen" onClick={buyCourse}>BUY</span>
                </div>
            </div>
        </div>
    );
}

export default SingleCourseStudentComponent;