import React, {useState} from 'react'
import {Button} from 'reactstrap'
import './SignButtons.css'
import Login from '../../Containers/Login/Login'
import Signup from '../../Containers/Signup/Signup'

function SignButtons(props) {
    const [login,setLogin] = useState(false);
    const [sign, setSignin] = useState(false);
    
    const toggleLog = () => setLogin(!login);
    const toggleSign = () => setSignin(!sign);

    const handleLogout = () =>{

    }

    return (
        <div className="c-group links">
            {
                props.auth.isAuthenticated?
                <h1> Hey , welcome to microsoft teams , {props.auth.username} </h1>
                :   
                <div>
                    <div>
                        <Button onClick={toggleLog} className="c-button-up" target="_blank" >
                            Sign up for free
                        </Button>
                    </div>
                    <div>
                        <Button onClick={toggleSign} className="c-button-in" target="_blank" >
                            Sign in
                        </Button>
                    </div>
                </div>
            }
            {
                (!props.auth.isAuthenticated)?
                    <Login loginUser={props.loginUser} login={login} auth={props.auth} setLogin={setLogin} />
                    :
                    <div>
                        <div className="navbar-text mr-3">{props.auth.username}</div>
                        <Button outline onClick={handleLogout}>
                            <span className="fa fa-sign-out fa-lg"></span> Logout
                            {/* { props.auth.isFetching ?
                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                : null
                            } */}
                        </Button>
                    </div>
            }

            {
                (!props.auth.isAuthenticated && sign)?<Signup sign={sign} auth={props.auth} setSignin={setSignin} />:null
            }

        </div>
    )
}

export default SignButtons