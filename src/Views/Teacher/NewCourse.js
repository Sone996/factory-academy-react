import React, { useContext, useState } from "react";
import { courseService } from "../../store/CourseModule/course.service";
import { notificationMsg } from "../../Services/BaseService";
import { AppContext } from "../../AppContext";

const formInterface = {
    name: '',
    price: '',
    description: '',
}

const NewCourse = () => {

    const [form, setForm] = useState(formInterface);
    const {modal, setModal} = useContext(AppContext);

    const nameHandler = event => {
        setForm({
            ...form,
            name: event.target.value
        })
    }
    const priceHandler = event => {
        setForm({
            ...form,
            price: event.target.value
        })
    }
    const descriptionHandler = event => {
        setForm({
            ...form,
            description: event.target.value
        })
    }

    const createCourse = () => {
        courseService.createCourse(form).then(res => {
            setModal({
                ...modal,
                status: true,
                modalName: 'notification-modal',
                successMsg: notificationMsg(res, 'COURSE_CREATED_SUCCESS')
            })
                setForm(formInterface);
            }
            ).catch(err => {
                setModal({
                    ...modal,
                    status: true,
                    modalName: 'notification-modal',
                    errMsg: notificationMsg(err, null)
                })
            });
    }

    return (
        <div className="new-course flex-col flex w-full">
            <div className="flex border-b py-4 px-4 w-full text-xl font-bold">
                <span>New Course</span>
            </div>
            <div className="flex flex-col w-1/2 px-16">
                <div className="flex flex-col mt-8 w-1/2">
                    <span>Name</span>
                    <input
                        className="input"
                        type="text"
                        autoComplete="off"
                        value={form.name}
                        onChange={nameHandler} />
                </div>
                <div className="flex flex-col mt-8 w-1/2">
                    <span>Price</span>
                    <input
                        className="input"
                        type="number"
                        autoComplete="off"
                        value={form.price}
                        onChange={priceHandler} />
                </div>
                <div className="flex flex-col mt-8">
                    <textarea
                        value={form.description}
                        onChange={descriptionHandler}
                        className="border resize-none w-full rounded p-3"
                        rows="10"
                        placeholder="Description" />
                </div>
                <div className="flex mt-8 w-1/4">
                    <div
                        onClick={createCourse}
                        className="button bg-blue-500"
                    >Create</div>
                </div>
            </div>
        </div>
    );
}

export default NewCourse;