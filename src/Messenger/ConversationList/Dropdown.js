import {React, useState} from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import {IconButton, Badge, Input, Button, TextField} from '@material-ui/core'
import './ConversationList.css'
function MyDropdown() {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const [url, setUrl] = useState('');
	const handleChange = (event) => setUrl(event.target.value);

	const joinRoom = (event) => {
		if(url.length === 5){
			window.location.href = `/conversations/${url}`
		}
		else if (url !== "") {
			var room = url.split("/");
			var roomCode = room[room.length-1];
			if(roomCode.length !== 5){
				document.getElementById('join-error').innerHTML = "Invalid URL / Room Code";
			}
			else
			window.location.href = `/conversations/${roomCode}`;
		} else {
			// uuid can be used
			var newurl = Math.random().toString(36).substring(2, 7)
			window.location.href = `/conversations/${newurl}`
		}
		event.preventDefault();
	}
  
    return (
        <div>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle outline color="primary">
                +
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem style={{textAlign: 'center'}} disabled>Enter room code</DropdownItem>
                <Input type="text" name="url" id="url" placeholder="URL / room code" onChange={e => handleChange(e)} />
                <Button variant="outlined" color="primary" onClick={joinRoom} style={{marginLeft: '30px', marginTop: '10px'}} >Connect</Button>
                <div id="join-error"></div>
            </DropdownMenu>
            </Dropdown>
        </div>
    )
}

export default MyDropdown
