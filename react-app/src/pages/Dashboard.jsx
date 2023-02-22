import React, { Component } from 'react';
import CourseList from '../components/CourseList';
import PageHeader from "../components/PageHeader";
class Dashboard extends Component {
    state = {  }
    render() { 
        return (  
            <div className='w-full'>
                <PageHeader/>
                <CourseList/>
            </div>
        );
    }
}
 
export default Dashboard;