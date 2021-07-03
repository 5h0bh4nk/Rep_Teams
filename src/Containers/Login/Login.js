import {React, useState} from 'react';
import {useDispatch} from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';

function Login(props) {

    // can be changed to false in case u want new values enter every time
    const [unmountOnClose, setUnmountOnClose] = useState(false);
    const [formdata, setformData] = useState({});

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
                <Form onSubmit={handleLogin} className="row">
                    <FormGroup>
                    <Label for="email" className="col-5 col-sm-12">username</Label>
                        <Input className="col-7 col-sm-12" type="text" name="username" onChange={handleChange} id="username" required={true} placeholder="Username" />
                    </FormGroup>
                    <FormGroup>
                        <Label className="col-5 col-sm-12" for="password">Password</Label>
                        <Input className="col-7 col-sm-12" type="password" name="password" onChange={handleChange} id="password" required={true} placeholder="password" />
                    </FormGroup>
                    <FormGroup>
                    <Button type="submit" value="submit" color="primary">Login</Button>{' '}
                    </FormGroup>
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
