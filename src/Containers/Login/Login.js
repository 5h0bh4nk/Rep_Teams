import {React, useState} from 'react';
import {useDispatch} from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';

function Login(props) {

    // can be changed to false in case u want new values enter every time
    const [unmountOnClose, setUnmountOnClose] = useState(false);
    const [formdata, setformData] = useState({});

    const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    // dispatch(requestLogin(creds))

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        console.log("HELLO");
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        console.log("HELLO2");
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            console.log(response);
            // Dispatch the success action
            // dispatch(fetchFavorites());
            // dispatch(receiveLogin(response));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => )
};

    const handleChange = (e) =>{
        //target ki name attr
        console.log(e.target.value);
        setformData({...formdata, [e.target.name] : e.target.value});
    }

    const handleLogin = (event) =>{
        event.preventDefault();
        toggleModal();
        // alert(this.username.value);
        console.log(formdata);
        props.loginUser(formdata);
        // dispatch(loginUser(formdata));
    }
  
    const toggleModal = () => props.setLogin(!props.login);

    return (
        <div>
            <Modal isOpen={props.login} toggle={toggleModal} className="login" unmountOnClose={unmountOnClose}>
                <ModalHeader toggle={toggleModal}>Login</ModalHeader>
                <ModalBody>
                <Form onSubmit={handleLogin}>
                    <FormGroup>
                    <Label for="email">username</Label>
                        <Input type="text" name="username" onChange={handleChange} id="username" required={true} placeholder="Username" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" onChange={handleChange} id="password" required={true} placeholder="password" />
                    </FormGroup>
                    <Button type="submit" value="submit" color="primary">Login</Button>{' '}
                </Form>
                </ModalBody>
                <ModalFooter>
                    
                    <Button color="secondary">Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default Login
