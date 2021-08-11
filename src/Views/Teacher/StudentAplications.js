import React, {useEffect, useState, useContext} from 'react';
import Scroll from '../../Components/Shared/Scroll';
import SimpleTable from '../../Components/Shared/SimpleTable';
import { personService } from '../../store/PersonModule/person.service';
import { AppContext } from '../../AppContext';

const StudentAplications = () => {

    const { modal, setModal } = useContext(AppContext);

    const [model, setModel] = useState([]);
    const [aplications, setAplications] = useState([]);
    const titles = ['Student Id', 'COurse Id', 'Accept'];

    const parseAplicationRequests = (aplicationRequests) => {
        aplicationRequests.forEach((aplication, i) => {
            aplicationRequests[i] = {
                student_id: aplicationRequests[i].student_id,
                course_id: aplicationRequests[i].course_id,
                accepted: aplicationRequests[i].accepted,
            }
        });
        setAplications(aplicationRequests);
    }

    const getActive = () => {
        var active = [];
        var i = 0;
        aplications.forEach((aplication) => {
            if(aplication.accepted === true) {
                active[i] = aplication;
                i++;
            }
        });
        setModel(active);
    }

    const getInactive = () => {
        var inactive = [];
        var i = 0;
        aplications.forEach((aplication) => {
            if(aplication.accepted === false) {
                inactive[i] = aplication;
                i++;
            }
        });
        setModel(inactive)
    }
    const singleView = (item) => {
        if(item.accepted === true) {
            setModal({
                ...modal,
                status: true,
                modalName: 'finishing-course-modal',
                data: item
            })
        } else {
            setModal({
                ...modal,
                status: true,
                modalName: 'requrest-accept-modal',
                data: item
            })
        }
    }

    const fetchMyStudents = () => {
        personService.fetchAplicationRequests().then(res => {
            parseAplicationRequests(res.data)
        }).catch(() => {
        });
    }

    useEffect(() => {
        fetchMyStudents();
    }, [])


    return (
        <div className="student-aplications flex-col flex w-full">
            <div className="flex border-b py-4 px-4 w-full text-xl font-bold">
                <span>Students</span>
            </div>
            <div className="flex w-full mt-4">
                <span className="button bg-darkGreen ml-4" onClick={getActive}>Active</span>
                <span className="button bg-darkGreen ml-4" onClick={getInactive}>Inactive</span>
            </div>

            <div className="flex flex-col justify-center h-full p-16">
                <div className="relative h-full w-full">
                    <Scroll>
                        <SimpleTable singleView={singleView} model={model} titles={titles}></SimpleTable>
                    </Scroll>
                </div>
            </div>

            {/* <div className="flex w-full justify-center mt-16">
		 	<simple-table @singleView="singleView" :model='model' :titles='titles'></simple-table>
		 </div> */}
        </div>
    );
}

export default StudentAplications;