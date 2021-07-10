import React from 'react'
import Header from '../../Components/Header/Header';
import Home from '../MeetStart/Home';

function Dashboard(props) {
    return (
        <div>
            <Header logoutUser = {props.logoutUser} auth = {props.auth} />
            <Home auth = {props.auth}/>
        </div>
    )
}

export default Dashboard
