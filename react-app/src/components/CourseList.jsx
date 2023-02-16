import React, { Component } from 'react';

class CourseList extends Component {
    state = {  }

    componentDidMount() {
        console.log('component did mount');
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'  }
        };
        fetch('./courses_test.json', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ courses: data }));
    }

    render() { 
        console.log('render', this.state.courses);
        return (              
            <div className="text-3xl font-bold p-2 border-2 bg-slate-600 rounded-lg shadow-lg text-white">CourseList</div>
        );
    }
}
 
export default CourseList;