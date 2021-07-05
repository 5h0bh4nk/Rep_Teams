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
			var roomCode = url.split("/")
			window.location.href = `/room/${roomCode[roomCode.length-1]}`;
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
				<h1 className="text-primary">
					Welcome, {props.auth.user.username}
				</h1>
				<p>
					Stay in touch with all your friends, anytime , anywhere.
				</p>
			</div>

			<div style={{
				background: "white", width: "30%", height: "auto", padding: "20px", minWidth: "400px",
				textAlign: "center", margin: "auto", marginTop: "100px"
			}}>
				<p style={{ margin: 0, fontWeight: "bold", paddingRight: "50px" }}>
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
				</Form>
			</div>
		</div>
	);
}

export default Home;