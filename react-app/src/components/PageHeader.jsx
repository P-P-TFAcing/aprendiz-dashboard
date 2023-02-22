import React, { Component } from 'react';

class PageHeader extends Component {
    state = {  }
    render() { 
        return (  
            <div className='flex w-full bg-slate-800 text-3xl text-bold p-3 text-white'>
                <img width="64px" src="/aprendiz_logo.jpg" alt="logo" className='p-1 object-center'/>
                <span className='text-center'>Aprendiz Dashboard</span>
            </div>
        );
    }
}
 
export default PageHeader;