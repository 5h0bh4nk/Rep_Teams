import React from 'react'
import Navbar from '../../Components/Navbar/Navbar';
import Jtron from '../../Components/Jumbotron/jumbotron';

function Homepage(props) {

    return (
        <div>
            <Navbar />
            <Jtron auth={props.auth}  loginUser={props.loginUser}/>
        </div>
    )
}

export default Homepage
