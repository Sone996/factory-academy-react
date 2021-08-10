import React from 'react'
import SimpleTable from '../Shared/SimpleTable';

const SingleCourseComponent = ({ tableData }) => {

    const titles = ['User Id', 'User', 'Course Start Date', 'Complete'];

    return (
        <div className="single-course-component flex flex-col text-xl">
            <span className="py-4">Students on this course</span>
            <SimpleTable model={tableData} titles={titles}></SimpleTable>
        </div>
    );
}

export default SingleCourseComponent;