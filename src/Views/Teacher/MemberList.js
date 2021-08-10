import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { personService } from '../../store/PersonModule/person.service';
import SimpleTable from '../../Components/Shared/SimpleTable';

const MemberList = () => {

    const titles = ['Id', 'Student', 'Course', 'Date of Start'];
    const [model, setModel] = useState([]);
    const history = useHistory();

    const parseMyStudents = (data) => {
        let myStudents = data;
        myStudents.forEach((student, i) => {
            myStudents[i] = {
                user_id: myStudents[i].user_id,
                user: myStudents[i].user,
                course_name: myStudents[i].course_name,
                course_start_date: myStudents[i].course_start_date
            }
        })
        setModel(myStudents);
    }

    const fetchMyStudents = () => {
        personService.fetchMyStudents()
            .then(res => {
                if (res.data.length > 0) {
                    parseMyStudents(res.data)
                }
            }).catch(() => {
            });
    }

    const singleView = (item) => {
        history.push({ pathname: `/profile/${item.user_id}` });
    }

    useEffect(() => {
        fetchMyStudents();
    }, [])

    return (
        <div className="member-list flex-col flex w-full">
            <div className="flex border-b py-4 px-4 w-full text-xl font-bold">
                <span>My Students</span>
            </div>
            <div className="flex w-full justify-center mt-16">
                <SimpleTable singleView={singleView} model={model} titles={titles}></SimpleTable>
            </div>
        </div>
    );
}

export default MemberList;