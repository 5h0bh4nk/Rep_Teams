import React from 'react'
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/SideBar/Sidebar'
import Home from '../MeetStart/Home';

function Dashboard(props) {
    return (
        <div>
            <Header />
            {/* <Sidebar /> */}
            <Home auth = {props.auth}/>
        </div>
    )
}

export default Dashboard
