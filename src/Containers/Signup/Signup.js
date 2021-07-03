import {React, useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup, FormText } from 'reactstrap';
import './Signup.css';
import {baseUrl} from '../../shared/basUrl';

function Signup(props) {
    // can be changed to false in case u want new values enter every time
    const [unmountOnClose, setUnmountOnClose] = useState(false);
    const [formData, setFormData] = useState({});

    const RegisterUser = (data) =>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        return fetch(baseUrl+'users/signup', requestOptions)
        .then(response => response.json())
        .then(response => {
                // If login was successful, set the token in local storage
                console.log(response);
        })
        .catch(error => console.log(error));
    }

    const handleChange = (e) =>{
        console.log(e.target.value);
        setFormData({...formData, [e.target.name] : e.target.value});
    }

    const handleSignup = (event) =>{
        event.preventDefault();
        toggleModal();
        // alert(this.username.value);
        console.log(formData);
        RegisterUser(formData);
        // dispatch(loginUser(formdata));
    }

    const toggleModal = () => props.setSignin(!props.sign);

    return (
        <div>
            <Modal isOpen={props.sign} toggle={toggleModal} className="login" unmountOnClose={unmountOnClose}>
                <ModalHeader toggle={toggleModal}>Signup</ModalHeader>
                <ModalBody>
                <Form onSubmit={handleSignup} onChange={handleChange}>
                    <FormGroup>
                        <Label className="col-5 col-sm-12" for="email">Email</Label>
                        <Input className="col-7 col-sm-12" type="email" name="email" id="email" placeholder="Email" required={true}/>
                    </FormGroup>
                    <FormGroup>
                        <Label className="col-5 col-sm-12" for="username">Username</Label>
                        <Input className="col-7 col-sm-12" type="text" name="username" id="username" placeholder="Username" required={true}/>
                    </FormGroup>
                    <FormGroup>
                        <Label className="col-5 col-sm-12" for="password">Password</Label>
                        <Input className="col-7 col-sm-12" type="password" name="password" id="password" placeholder="password" required={true}/>
                    </FormGroup>
                    <FormGroup>
                        <Label className="col-5 col-sm-12" for="confirmPassword">Confirm Password</Label>
                        <Input className="col-7 col-sm-12" type="password" name="cpassword" id="cpassword" placeholder="confirm password" required={true}/>
                    </FormGroup>
                    <FormGroup>
                        <Label className="col-5 col-sm-12" for="Age">Age</Label>
                        <Input className="col-7 col-sm-12" type="number" name="age" id="age" required={true}>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label className="col-3 col-sm-12" for="exampleText">Bio</Label>
                        <Input className="col-7 col-sm-12" type="textarea" name="text" id="exampleText" />
                    </FormGroup>
                    {/* <FormGroup>
                        <Label for="exampleFile">File</Label>
                        <Input type="file" name="file" id="exampleFile" />
                        <FormText color="muted">
                        This is some placeholder block-level help text for the above input.
                        It's a bit lighter and easily wraps to a new line.
                        </FormText>
                    </FormGroup> */}
                    <FormGroup tag="fieldset">
                        <FormGroup check>
                        <Label check>
                            <Input type="checkbox" name="terms" required={true}/>{' '}
                            I agree to T&C
                        </Label>
                        </FormGroup>
                        <FormGroup check>
                        <Label check>
                            <Input type="checkbox" name="promotion" />{' '}
                            I agree recieving mails from Microsoft 
                        </Label>
                        </FormGroup>
                    </FormGroup>
                    <Button color="primary" type="submit">Submit</Button>
                </Form>
                </ModalBody>
                <ModalFooter>
                    
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default Signup