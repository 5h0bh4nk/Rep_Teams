import React from 'react'
import './Sidebar.css';

function Sidebar() {
    return (
        <div className="side-bar">
            <i className="far fa-bell" style={{fontSize: '25px', padding: '10px 10px', fontWeight: '100px'}}></i>
                <span>Activity</span>
            <i class="far fa-comment" style={{fontSize: '25px', padding: '10px 10px'}}></i>
                <span>Chat</span>
            <i class="far fa-calendar-alt" style={{fontSize: '25px', padding: '10px 10px'}}></i>
                <span>Calendar</span>
        </div>
    )
}

export default Sidebar
