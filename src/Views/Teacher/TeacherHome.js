import React, { useContext } from "react";
import { AppContext } from '../../AppContext';
import SimpleTable from "../../Components/Shared/SimpleTable";

const TeacherHome = () => {

    const { loggedUser, setLoggedUser } = useContext(AppContext);
    const titles = ['Id', 'Name', 'Average Mark', 'Price'];
    const model = [
        { name: 'Jane Cooper', title: 'Regional Paradigm Technician', role: 'Admin', email: 'jane.cooper@example.com' },
        { name: 'Cody Fisher', title: 'Product Directives Officer', role: 'Owner', email: 'cody.fisher@example.com' },
        { name: 'Jane Cooper', title: 'Regional Paradigm Technician', role: 'Admin', email: 'jane.cooper@example.com' },
        { name: 'Cody Fisher', title: 'Product Directives Officer', role: 'Owner', email: 'cody.fisher@example.com' },
        { name: 'Jane Cooper', title: 'Regional Paradigm Technician', role: 'Admin', email: 'jane.cooper@example.com' },
        { name: 'Cody Fisher', title: 'Product Directives Officer', role: 'Owner', email: 'cody.fisher@example.com' },
        { name: 'Jane Cooper', title: 'Regional Paradigm Technician', role: 'Admin', email: 'jane.cooper@example.com' },
        { name: 'Cody Fisher', title: 'Product Directives Officer', role: 'Owner', email: 'cody.fisher@example.com' },
    ];

    const singleView = (item) => {
        console.log(item)
        // this.$router.push({ path: '/course', query: { id: item.id } })
    }

    return (
        <div className="flex flex-col">
            <span>TEACHER HOME {loggedUser.name}</span>
            <SimpleTable titles={titles} model={model} singleView={singleView}></SimpleTable>
        </div>
    )
}

export default TeacherHome;