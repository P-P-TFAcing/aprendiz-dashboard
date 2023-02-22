import React, { Component } from 'react';

class CourseList extends Component {
    state = {  }

    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'  }
        };
        fetch('./courses_test.json', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ courses: data }));
    }

    render() { 
        let courses = this.state.courses;
        if(!courses) {
            return <div>                
            </div>
        } else {
            return (              
                <div className='flex p-3'>
                    { courses.map(course => (                                                     
                        <div key={course.id} className="text-2xl p-3 border-2 bg-slate-700 rounded-lg shadow-lg text-white">                            
                            <a href={"CourseView/"+ course.id}>{course.name}</a>
                        </div>
                    )) } 
                </div>
            );    
        }
    }
}
 
export default CourseList;