import {React, useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup, FormText } from 'reactstrap';
import './Signup.css'

function Signup(props) {
    // can be changed to false in case u want new values enter every time
    const [unmountOnClose, setUnmountOnClose] = useState(false);
  
    const toggle = () => props.setSignin(!props.sign);

    return (
        <div>
            <Modal isOpen={props.sign} toggle={toggle} className="login" unmountOnClose={unmountOnClose}>
                <ModalHeader toggle={toggle}>Signup</ModalHeader>
                <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="password" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmPassword">Confirm Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="confirm password" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="Age">Age</Label>
                        <Input type="select" name="select" id="exampleSelect">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText">Bio</Label>
                        <Input type="textarea" name="text" id="exampleText" />
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
                            <Input type="radio" name="radio1" />{' '}
                            I agree to T&C
                        </Label>
                        </FormGroup>
                        <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" />{' '}
                            I agree recieving mails from Microsoft 
                        </Label>
                        </FormGroup>
                    </FormGroup>
                </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Submit</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default Signup