import {React, useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';

function Login(props) {

    // can be changed to false in case u want new values enter every time
    const [unmountOnClose, setUnmountOnClose] = useState(false);

    const handleLogin = (e) =>{
        toggleModal();
        alert(this.username.value);
        // console.log(this.username.value);
        props.loginUser({username: this.username.value, password: this.password.value});
        e.preventDefault();
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
                        <Input type="text" name="username" id="username" required={true} placeholder="Username" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" required={true} placeholder="password" />
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
