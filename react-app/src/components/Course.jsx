import React, { Component } from 'react';

class Course extends Component {

    constructor(props) {
        super(props);
        this.state = { courseId: props.courseId }
    }    

    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'  }
        };
        fetch('/courses_test.json', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ courses: data }));
    }

    courseById(courses, courseId) {        
        console.log('get course by id', courses, courseId);
        for(const c of courses) {
            if(c.id === courseId) {
                return c;
            }
        }
        return undefined;
    }

    render() { 
        let courses = this.state.courses;
        if(!courses) {
            return <div>NO COURSES</div>
        } else {
            let course = this.courseById(courses, this.state.courseId);
            if(!course) {
                return <div>COURSE NOT FOUND</div>
            } else {
                return (              
                    <div className='bg-black text-white p-2 text-2xl'>
                        <h1>{course.name}</h1>
                    </div>
                );        
            }
        }
    }
}
 
export default Course;