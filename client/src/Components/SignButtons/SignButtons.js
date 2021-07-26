import React, {useState} from 'react'
import {Button} from 'reactstrap'
import {Link} from 'react-router-dom'
import './SignButtons.css'
import Login from '../../Containers/Login/Login'
import Signup from '../../Containers/Signup/Signup'

function SignButtons(props) {
    const [login,setLogin] = useState(false);
    const [sign, setSignin] = useState(false);
    
    const toggleLog = () => setLogin(!login);
    const toggleSign = () => setSignin(!sign);

    const handleLogout = () =>{
        props.logoutUser();
    }

    return (
        <div className="c-group links">
            {
                props.auth.isAuthenticated?
                <div>
                    <br /><br />
                <h3 className="text-success"> Succesfully logged in as
                    <span>
                     {' '}
                     { props.auth.user? props.auth.user.username : null } 
                    </span>
                </h3>
                <br />
                <Button outline onClick={handleLogout}>
                    <span className="fa fa-sign-out fa-lg"></span> Logout
                    { 
                        props.auth.isLoading ?
                        <span className="fa fa-spinner fa-pulse fa-fw"></span>
                        : null
                    }
                </Button>{'  '}
                <Link to="/dashboard" className="btn" style={{backgroundColor: '#4b53bc', color: 'white'}}>Go to dashboard</Link>
            
                </div>
                :
                <div>
                    <div>
                        <Button onClick={toggleLog} className="c-button-up" target="_blank" >
                        <span className="fa fa-sign-out fa-lg"></span> Sign in{' '}
                        { 
                            props.auth.isLoading ?
                            <span className="fa fa-spinner fa-pulse fa-fw"></span>
                            : null
                        }
                        </Button>
                    </div>
                    <div>
                        <Button onClick={toggleSign} className="c-button-in" target="_blank" >
                            Sign up for free
                        </Button>
                    </div>
                    {
                        (props.auth.errMess)?
                        <div className="errorDisplay">Invalid Credentials / Error Occured</div>
                        : null
                    }
                    <div className="errorDisplay"></div>
                    <div className="successDisplay"></div>
                </div>
            }
            {
                (login && !props.auth.isAuthenticated)?
                    <Login loginUser={props.loginUser} login={login} auth={props.auth} setLogin={setLogin} />
                :null
            }
            {
                (!props.auth.isAuthenticated && sign)?
                    <Signup sign={sign} auth={props.auth} setSignin={setSignin} />:null
            }
            <br />
            <br />
        </div>
    )
}

export default SignButtons