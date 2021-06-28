import {React, useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';

function Login(props) {

    // can be changed to false in case u want new values enter every time
    const [unmountOnClose, setUnmountOnClose] = useState(false);
  
    const toggle = () => props.setLogin(!props.login);

    return (
        <div>
            <Modal isOpen={props.login} toggle={toggle} className="login" unmountOnClose={unmountOnClose}>
                <ModalHeader toggle={toggle}>Login</ModalHeader>
                <ModalBody>
                <Form>
                    <FormGroup>
                    <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" required={true} placeholder="Email" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" required={true} placeholder="password" />
                    </FormGroup>
                </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary">Submit</Button>{' '}
                    <Button color="secondary">Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default Login
