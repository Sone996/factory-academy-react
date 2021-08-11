import '../../App.scss';
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../AppContext';

const NotificationModal = () => {

    const { modal, setModal } = useContext(AppContext);

    const close = () => {
        setModal({
            ...modal,
            status: false,
            name: '',
            data: null
        })
    }

    const changeClass = () => {
        let elem = document.getElementById('notification-modal');
        if (elem) {
            elem.classList.remove("goIn");
            elem.classList.add("goOut");
            setTimeout(() => { close() }, 450)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            changeClass();
        }, 3000);
    }, [])

    return (
        <div
            id="notification-modal"
            className={`notification-modal rounded-lg w-2/12 flex flex-row absolute text-tiny felx items-center justify-center goIn ${modal.errMsg ? 'bg-red' : 'bg-green'}`}
        >
            <div className="flex items-center justify-between w-full px-8">
                <span className="model.errMsg ? 'text-darkRed' : 'text-darkGreen'">{modal.errMsg ? modal.errMsg : modal.successMsg}</span>
                {modal.successMsg ?
                    <i className="fa fa-check text-darkGreen text-3xl" aria-hidden="true"></i>
                    :
                    <i className="fa fa-exclamation-triangle text-darkRed text-3xl" aria-hidden="true"></i>
                }
            </div>
        </div>
    );
}

export default NotificationModal;