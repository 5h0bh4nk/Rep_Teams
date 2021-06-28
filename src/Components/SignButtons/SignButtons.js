import React, {useState} from 'react'
import {Button} from 'reactstrap'
import './SignButtons.css'
import Login from '../../Containers/Login/Login'
import Signup from '../../Containers/Signup/Signup'

function SignButtons() {
    const [login,setLogin] = useState(false);
    const [sign, setSignin] = useState(false);
    
    const toggleLog = () => setLogin(!login);
    const toggleSign = () => setSignin(!sign);

    return (
        <div className="c-group links">
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
            
            {
                login?<Login login={login} setLogin={setLogin} />:null
            }

            {
                sign?<Signup sign={sign} setSignin={setSignin} />:null
            }

        </div>
    )
}

export default SignButtons