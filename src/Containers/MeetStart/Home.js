import React, { useState } from 'react';
import { Input, Button } from '@material-ui/core';
import "./Home.css"

function Home(props) {
  	
	const [url, setUrl] = useState('');

	const handleChange = (e) => setUrl(e.target.value);

	const join = () => {
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
	}
	return (
		<div className="container2">
			<div>
				<h1 style={{ color:'#6264a7',fontSize: "45px" }}>
					Hello, {props.auth.user.username}
				</h1>
				<p style={{ fontWeight: "200" }}>
					Welcome to MSteams that lets you stay in touch with all your friends, anytime , anywhere.
				</p>
			</div>

			<div style={{
				background: "white", width: "30%", height: "auto", padding: "20px", minWidth: "400px",
				textAlign: "center", margin: "auto", marginTop: "100px"
			}}>
				<p style={{ margin: 0, fontWeight: "bold", paddingRight: "50px" }}>
					Enter the room code , url or start a meeting now
				</p>
				<Input placeholder="URL / room code" onChange={e => handleChange(e)} />
				<Button variant="contained" color="primary" onClick={join} style={{ margin: "20px" }}>Go</Button>
			</div>
		</div>
	);
}

export default Home;