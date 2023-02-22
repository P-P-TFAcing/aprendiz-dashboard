import React from 'react';
import { useParams } from 'react-router';

import Course from '../components/Course';
import PageHeader from "../components/PageHeader";

function CourseView() {

    const params = useParams();
    return (             
        <div className='w-full'>
            <PageHeader/>
            <Course courseId={params.courseId}/>
        </div>
    );
}

export default CourseView;
