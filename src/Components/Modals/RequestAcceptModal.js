import '../../App.scss';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../AppContext';
import { personService } from '../../store/PersonModule/person.service';

const formInterface = {
    course_id: null,
    accepted: null
}

const RequestAcceptModal = () => {

    const { modal, setModal } = useContext(AppContext);

    const [form, setForm] = useState(formInterface);

    const resolvingAplication = (status) => {
        setForm({
            ...form,
            course_id: modal.data.course_id,
            accepted: status
        })
    }

    const sendData = () => {
        personService.resolveRequest(form).then(res => {
            cloase();
            personService.fetchAplicationRequests();
        }).catch(err => {
            console.log(err.response.data.errors);
            cloase()
        }
        );
    }

    const cloase = () => {
        setModal({
            ...modal,
            status: false,
            name: '',
            data: null
        })
    }

    useEffect(() => {
        if (form.accepted != null) {
            sendData();
        }
    }, [form.accepted])

    return (
        <div id="requrest-accept-modal" className="requrest-accept-modal h-1/6 rounded-lg w-2/12 h-3/12 bg-gray-400 flex flex-row absolute text-tiny felx items-center justify-center">
            <div className="flex items-center justify-between w-full px-8">
                <span onClick={() => resolvingAplication(false)} className="bg-darkRed py-2 px-4 rounded-lg cursor-pointer">Reject</span>
                <span onClick={() => resolvingAplication(true)} className="bg-darkGreen py-2 px-4 rounded-lg cursor-pointer">Accept</span>
            </div>
        </div>
    );
}

export default RequestAcceptModal;