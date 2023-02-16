import React, { Component } from 'react';
import CourseList from '../components/CourseList';

class Dashboard extends Component {
    state = {  }
    render() { 
        return (  
            <div className='flex p-2'>
                <CourseList/>
                <CourseList/>
                <CourseList/>
            </div>
        );
    }
}
 
export default Dashboard;