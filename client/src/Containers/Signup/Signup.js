import {React, useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, Input, Label, Form, FormGroup } from 'reactstrap';
import './Signup.css';
import {baseUrl} from '../../shared/basUrl';

function Signup(props) {
    // can be changed to false in case u want new values enter every time
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
            if(response.err){
                document.querySelector('.registrationError').innerHTML= response.err.message;
            }
            else{
                document.querySelector('.successDisplay').innerHTML = response.status;
                document.querySelector('.errorDisplay').innerHTML = '';
            }
        })
        .catch(error => console.error(error));
    }

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name] : e.target.value});
    }

    const handleSignup = (event) =>{
        event.preventDefault();
        if(event.target.password.value.length <= 5){
            document.querySelector('.registrationError').innerHTML = "Length of password must be greater than 5";
        }
        else if(event.target.password.value === event.target.cpassword.value){
            RegisterUser(formData);
            toggleModal();
        }
        else{
            document.querySelector('.registrationError').innerHTML = "Both passwords dont match . Try again !";
        }
    }

    const toggleModal = () => props.setSignin(!props.sign);

    return (
        <div>
            <Modal isOpen={props.sign} toggle={toggleModal} className="login" unmountOnClose={false}>
                <ModalHeader toggle={toggleModal}>Signup</ModalHeader>
                <ModalBody>
                <Form onSubmit={handleSignup} onChange={handleChange}>
                    <FormGroup>
                        <Label className="col-5 col-sm-12" for="name">Name</Label>
                        <Input className="col-7 col-sm-12" type="text" name="name" id="name" placeholder="Name" required={true}/>
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
                        <Input className="col-7 col-sm-12" type="password" name="cpassword" id="cpassword" placeholder="Confirm password" required={true}/>
                    </FormGroup>
                    <Button color="primary" type="submit" className="c-button-up">Register</Button>
                </Form>
                </ModalBody>
                <div className="registrationError"></div>
            </Modal>
            
        </div>
    )
}

export default Signup