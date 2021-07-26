import React, { useState } from 'react';
import { Input, Button, Form, FormGroup, Label } from 'reactstrap';
import "./Home.css"

function Home(props) {
	const [url, setUrl] = useState('');

	const handleChange = (event) => setUrl(event.target.value);

	const joinRoom = (event) => {
		if(url.length === 5){
			window.location.href = `/room/${url}`
		}
		else if (url !== "") {
			var room = url.split("/");
			var roomCode = room[room.length-1];
			if(roomCode.length !== 5){
				document.getElementById('join-error').innerHTML = "Invalid URL / Room Code";
			}
			else
			window.location.href = `/room/${roomCode}`;
		} else {
			// uuid can be used
			var newurl = Math.random().toString(36).substring(2, 7)
			window.location.href = `/room/${newurl}`
		}
		event.preventDefault();
	}
	return (
		<div className="container2">
			<div>
				<h1 class="welcome-text">
					Welcome, {props.auth.user.username}
				</h1>
				<p>
					Stay in touch with all your friends, anytime , anywhere.
				</p>
			</div>

			<div className="joinBox">
				<p>
					Enter the room code , paste the URL or start a meeting now
				</p>
				<Form onSubmit={joinRoom}>
					<FormGroup>
						<Label for="url"></Label>
						<Input type="text" name="url" id="url" placeholder="URL / room code" onChange={e => handleChange(e)} />
					</FormGroup>
					<br />
					<FormGroup>
						<Button type="submit" value="submit" color="primary">Connect</Button>
					</FormGroup>
					<span>* click connect directly to create a new room</span>
				</Form>
				<div id="join-error"></div>
			</div>
		</div>
	);
}

export default Home;