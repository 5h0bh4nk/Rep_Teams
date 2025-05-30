import React, { Component } from 'react'
import io from 'socket.io-client'
import {IconButton, Badge, Input, Button} from '@material-ui/core'
import VideocamIcon from '@material-ui/icons/Videocam'
import VideocamOffIcon from '@material-ui/icons/VideocamOff'
import MicIcon from '@material-ui/icons/Mic'
import MicOffIcon from '@material-ui/icons/MicOff'
import ScreenShareIcon from '@material-ui/icons/ScreenShare'
import StopScreenShareIcon from '@material-ui/icons/StopScreenShare'
import CallEndIcon from '@material-ui/icons/CallEnd'
import ChatIcon from '@material-ui/icons/Chat'
import Header from '../../Components/Header/Header'

import { message } from 'antd'
import 'antd/dist/antd.css'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.css'
import "./Video.css"
import {peerConnectionConfig} from './Helpers/peerConnectionConfig';

// Server URL configuration for production deployment
const isDevelopment = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1' || 
                     window.location.hostname === '192.168.1.9';

let server_url;
if (process.env.REACT_APP_BACKEND_URL) {
    server_url = process.env.REACT_APP_BACKEND_URL;
} else if (isDevelopment) {
    const SERVER_BASE = window.location.hostname === '192.168.1.9' ? 
                       'http://192.168.1.9:4001' : 
                       'http://localhost:4001';
    server_url = SERVER_BASE;
} else {
    // Production - use same domain with secure protocol
    server_url = window.location.protocol === 'https:' ? 
                `https://${window.location.host}` : 
                `http://${window.location.host}`;
}

var connections = {}

var socket = null
var socketId = null
var elms = 0

class Video extends Component {
	constructor(props) {
		super(props)

		this.localVideoref = React.createRef()

		this.videoAvailable = false
		this.audioAvailable = false

		this.state = {
			video: false,
			audio: false,
			screen: false,
			showModal: false,
			screenAvailable: false,
			messages: [],
			message: "",
			newmessages: 0,
			askForUsername: true,
			username: this.props.auth.user.username,
			myVideoClass: "my-video",
			path: window.location.href.split("/")
		}
		connections = {}
	}

	componentDidMount() {
		// Initialize permissions after component mounts
		this.getPermissions()
	}

	getPermissions = async () => {
		try{
			await navigator.mediaDevices.getUserMedia({ video: true })
				.then(() => this.videoAvailable = true)
				.catch(() => this.videoAvailable = false)

			await navigator.mediaDevices.getUserMedia({ audio: true })
				.then(() => this.audioAvailable = true)
				.catch(() => this.audioAvailable = false)

			if (navigator.mediaDevices.getDisplayMedia) {
				this.setState({ screenAvailable: true })
			} else {
				this.setState({ screenAvailable: false })
			}

			/// webrtc usage
			if (this.videoAvailable || this.audioAvailable) {
				navigator.mediaDevices.getUserMedia({ video: this.videoAvailable, audio: this.audioAvailable })
					.then((stream) => {
						window.localStream = stream
						if (this.localVideoref.current) {
							this.localVideoref.current.srcObject = stream
						}
					})
					.then((stream) => {})
					.catch((e) => console.error(e))
			}
		} catch(e) { console.error(e) }
	}

	getMedia = () => {
		this.setState({
			...this.state,
			video: this.videoAvailable,
			audio: this.audioAvailable
		}, () => {
			this.getUserMedia();
			this.connectToSocketServer();
		})
	}

	getUserMedia = () => {
		// get media ( audio and video ) if the browser is allowed permissions
		if ((this.state.video && this.videoAvailable) || (this.state.audio && this.audioAvailable)) {
			navigator.mediaDevices.getUserMedia({ video: this.state.video, audio: this.state.audio })
				.then(this.getUserMediaSuccess)
				.then((stream) => {})
				.catch((e) => console.log(e))
		} else {
			try {
				// else stop all tracks - only if video element and srcObject exist
				if (this.localVideoref.current && this.localVideoref.current.srcObject) {
					let tracks = this.localVideoref.current.srcObject.getTracks()
					tracks.forEach(track => track.stop())
				}
			} catch (e) {console.error(e)}
		}
	}

	getUserMediaSuccess = (stream) => {
		try {
			window.localStream.getTracks().forEach(track => track.stop())
		} catch(e) { console.log(e) }

		window.localStream = stream
		if (this.localVideoref.current) {
			this.localVideoref.current.srcObject = stream
		}

		for (let id in connections) {
			if (id === socketId) continue

			connections[id].addStream(window.localStream)

			connections[id].createOffer().then((description) => {
				connections[id].setLocalDescription(description)
					.then(() => {
						socket.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
					})
					.catch(e => console.log(e))
			})
		}

		stream.getTracks().forEach(track => track.onended = () => {
			this.setState({
				video: false,
				audio: false,
			}, () => {
				try {
					if (this.localVideoref.current && this.localVideoref.current.srcObject) {
						let tracks = this.localVideoref.current.srcObject.getTracks()
						tracks.forEach(track => track.stop())
					}
				} catch(e) { console.log(e) }

				let blackSilence = (...args) => new MediaStream([this.black(...args), this.silence()])
				window.localStream = blackSilence()
				if (this.localVideoref.current) {
					this.localVideoref.current.srcObject = window.localStream
				}

				for (let id in connections) {
					connections[id].addStream(window.localStream)

					connections[id].createOffer().then((description) => {
						connections[id].setLocalDescription(description)
							.then(() => {
								socket.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
							})
							.catch(e => console.log(e))
					})
				}
			})
		})
	}


	/// check
	getDisplayMedia = () => {
		if (this.state.screen) {
			if (navigator.mediaDevices.getDisplayMedia) {
				navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
					.then(this.getDisplayMediaSuccess)
					.then((stream) => {
						this.setState({myVideoClass: (this.state.myVideoClass==='my-video')?'my-video-screen':'my-video'})
					})
					.catch((e) => console.log(e))
			}
		}
		else{
			this.setState({myVideoClass: (this.state.myVideoClass==='my-video')?'my-video-screen':'my-video', video: true}, () => this.getUserMedia())
		}
	}

	getDisplayMediaSuccess = (stream) => {
		try {
			window.localStream.getTracks().forEach(track => track.stop())
		} catch(e) { console.log(e) }

		window.localStream = stream
		if (this.localVideoref.current) {
			this.localVideoref.current.srcObject = stream
		}

		for (let id in connections) {
			if (id === socketId) continue;

			connections[id].addStream(window.localStream);

			// eslint-disable-next-line no-loop-func
			connections[id].createOffer().then((description) => {
				connections[id].setLocalDescription(description)
					.then(() => {
						socket.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
					})
					.catch(e => console.log(e))
			})
		}

		stream.getTracks().forEach(track => track.onended = () => {
			this.setState({
				screen: false,
			}, () => {
				try {
					if (this.localVideoref.current && this.localVideoref.current.srcObject) {
						let tracks = this.localVideoref.current.srcObject.getTracks()
						tracks.forEach(track => track.stop())
					}
				} catch(e) { console.log(e) }

				let blackSilence = (...args) => new MediaStream([this.black(...args), this.silence()])
				window.localStream = blackSilence()
				if (this.localVideoref.current) {
					this.localVideoref.current.srcObject = window.localStream
				}

				this.getUserMedia()
			})
		})
	}

	gotMessageFromServer = (fromId, message) => {
		var signal = JSON.parse(message)

		if (fromId !== socketId) {
			if (signal.sdp) {
				connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
					if (signal.sdp.type === 'offer') {
						connections[fromId].createAnswer().then((description) => {
							connections[fromId].setLocalDescription(description).then(() => {
								socket.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }))
							}).catch(e => console.log(e))
						}).catch(e => console.log(e))
					}
				}).catch(e => console.log(e))
			}

			if (signal.ice) {
				connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e))
			}
		}
	}

	changeCssVideos = (main) => {
		let widthMain = main.offsetwidth
		let minWidth = "30%"
		if ((widthMain * 30 / 100) < 300) {
			minWidth = "300px"
		}
		let minHeight = "40%"

		let height = String(100 / elms) + "%"
		let width = ""
		if(elms === 0 || elms === 1) {
			width = "400px"
			height = "300px"
		} else if (elms === 2) {
			width = "45%"
			height = "50%"
		} else if (elms === 3 || elms === 4) {
			width = "35%"
			height = "50%"
		} else {
			width = String(100 / elms) + "%"
		}

		let videos = main.querySelectorAll("video")
		for (let a = 0; a < videos.length; ++a) {
			videos[a].style.minWidth = minWidth
			videos[a].style.minHeight = minHeight
			videos[a].style.setProperty("width", width)
			videos[a].style.setProperty("height", height)
		}

		return {minWidth, minHeight, width, height}
	}

	connectToSocketServer = () => {
		socket = io.connect(server_url, { secure: true })

		socket.on('signal', this.gotMessageFromServer)

		socket.on('connect', () => {
			socket.emit('join-call', {path: window.location.href, userId: this.props.auth.user.username})
			socketId = socket.id

			socket.on('chat-message', this.addMessage)

			socket.on('user-left', (id) => {
				let video = document.querySelector(`[data-socket="${id}"]`)
				if (video !== null) {
					elms--
					video.parentNode.removeChild(video)

					let main = document.getElementById('main')
					this.changeCssVideos(main)
				}
			})

			socket.on('user-joined', (id, clients) => {
				clients.forEach((socketListId) => {
					connections[socketListId] = new RTCPeerConnection(peerConnectionConfig)
					// Wait for their ice candidate       
					connections[socketListId].onicecandidate = function (event) {
						if (event.candidate != null) {
							socket.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }))
						}
					}

					// Wait for their video stream
					connections[socketListId].onaddstream = (event) => {
						// TODO mute button, full screen button
						var searchVidep = document.querySelector(`[data-socket="${socketListId}"]`)
						if (searchVidep !== null) { // if i don't do this check it make an empyt square
							searchVidep.srcObject = event.stream
						} else {
							elms = clients.length
							let main = document.getElementById('main')
							let cssMesure = this.changeCssVideos(main)

							let video = document.createElement('video')

							let css = {minWidth: cssMesure.minWidth, minHeight: cssMesure.minHeight, maxHeight: "100%", margin: "10px",
								borderStyle: "solid", borderColor: "#bdbdbd", objectFit: "fill"}
							for(let i in css) video.style[i] = css[i]

							video.style.setProperty("width", cssMesure.width)
							video.style.setProperty("height", cssMesure.height)
							video.setAttribute('data-socket', socketListId)
							video.srcObject = event.stream
							video.autoplay = true
							video.playsinline = true

							main.appendChild(video)
						}
					}

					// Add the local video stream
					if (window.localStream !== undefined && window.localStream !== null) {
						connections[socketListId].addStream(window.localStream)
					} else {
						let blackSilence = (...args) => new MediaStream([this.black(...args), this.silence()])
						window.localStream = blackSilence()
						connections[socketListId].addStream(window.localStream)
					}
				})

				if (id === socketId) {
					for (let id2 in connections) {
						if (id2 === socketId) continue
						
						try {
							connections[id2].addStream(window.localStream)
						} catch(e) {}
			
						connections[id2].createOffer().then((description) => {
							connections[id2].setLocalDescription(description)
								.then(() => {
									socket.emit('signal', id2, JSON.stringify({ 'sdp': connections[id2].localDescription }))
								})
								.catch(e => console.error(e))
						})
					}
				}
			})
		})
	}

	silence = () => {
		let ctx = new AudioContext()
		let oscillator = ctx.createOscillator()
		let dst = oscillator.connect(ctx.createMediaStreamDestination())
		oscillator.start()
		ctx.resume()
		return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false })
	}
	black = ({ width = 640, height = 480 } = {}) => {
		let canvas = Object.assign(document.createElement("canvas"), { width, height })
		canvas.getContext('2d').fillRect(0, 0, width, height)
		let stream = canvas.captureStream()
		return Object.assign(stream.getVideoTracks()[0], { enabled: false })
	}

	handleVideo = () => this.setState({ video: !this.state.video }, () => this.getUserMedia())
	handleAudio = () => this.setState({ audio: !this.state.audio }, () => this.getUserMedia())
	handleScreen = () => this.setState({ screen: !this.state.screen, video: false }, () => this.getDisplayMedia())

	handleEndCall = () => {
		try {
			if (this.localVideoref.current && this.localVideoref.current.srcObject) {
				let tracks = this.localVideoref.current.srcObject.getTracks()
				tracks.forEach(track => track.stop())
			}
		} catch (e) {}
		window.location.href = "/conversations"
	}

	openChat = () => this.setState({ showModal: true, newmessages: 0 })
	closeChat = () => this.setState({ showModal: false })
	handleMessage = (e) => this.setState({ message: e.target.value })
	addMessage = (data, sender, socketIdSender) => {
		this.setState(prevState => ({
			messages: [...prevState.messages, { "sender": sender, "data": data }],
		}))
		if (socketIdSender !== socketId) {
			this.setState({ newmessages: this.state.newmessages + 1 })
		}
	}

	handleUsername = (e) => this.setState({ username: e.target.value })

	sendMessage = () => {
		if(this.state.message==="") return;
		socket.emit('chat-message', this.state.message, this.state.username)
		this.setState({ message: "", sender: this.state.username })
	}

	copyUrl = () => {
		let text = window.location.href
		if (!navigator.clipboard) {
			let textArea = document.createElement("textarea")
			textArea.value = text
			document.body.appendChild(textArea)
			textArea.focus()
			textArea.select()
			try {
				document.execCommand('copy')
				message.success("Link copied to clipboard!")
			} catch (err) {
				message.error("Failed to copy")
			}
			document.body.removeChild(textArea)
			return
		}
		navigator.clipboard.writeText(text).then(function () {
			message.success("Link copied to clipboard!")
		}, () => {
			message.error("Failed to copy")
		})
	}

	connect = () => this.setState({ askForUsername: false }, () => this.getMedia())

	isChrome = function () {
		let userAgent = (navigator && (navigator.userAgent || '')).toLowerCase()
		let vendor = (navigator && (navigator.vendor || '')).toLowerCase()
		let matchChrome = /google inc/.test(vendor) ? userAgent.match(/(?:chrome|crios)\/(\d+)/) : null
		// let matchFirefox = userAgent.match(/(?:firefox|fxios)\/(\d+)/)
		// return matchChrome !== null || matchFirefox !== null
		return matchChrome !== null
	}

	onKeyUp = (event) => {
		if (event.charCode === 13) {
		  this.sendMessage();
		}
		else this.handleMessage(event);
	}

	render() {
		if(!this.isChrome()){
			return (
				<div className="uncompatible">
					<h1>Sorry, this works only with Google Chrome</h1>
				</div>
			)
		}
		return (
			<div>
				<Header logoutUser = {this.props.logoutUser} auth = {this.props.auth} />
				{
					this.state.askForUsername?
					<div>
						<div className="join-room-text">
							<Input placeholder="Username" value={this.props.auth.user.username} onChange={e => this.handleUsername(e)} />
							<Button variant="contained" color="primary" onClick={this.connect} style={{ margin: "20px" }}>Connect</Button>
						</div>

						<div >
							<video id="my-video" ref={this.localVideoref} autoPlay muted >
							</video>
						</div>
					</div>
					:
					<div>
						<div className="btn-down">
							<IconButton className="ibtn" onClick={this.handleVideo}>
								{(this.state.video) ? <VideocamIcon /> : <VideocamOffIcon />}
							</IconButton>

							<IconButton className="ibtn-danger" onClick={this.handleEndCall}>
								<CallEndIcon />
							</IconButton>

							<IconButton className="ibtn" onClick={this.handleAudio}>
								{this.state.audio  ? <MicIcon /> : <MicOffIcon />}
							</IconButton>

							{
								this.state.screenAvailable  ?
								<IconButton className="ibtn" onClick={this.handleScreen}>
									{this.state.screen  ? <ScreenShareIcon /> : <StopScreenShareIcon />}
								</IconButton>
								: null
							}

							<Badge badgeContent={this.state.newmessages} max={999} color="secondary" onClick={this.openChat}>
								<IconButton className="ibtn" onClick={this.openChat}>
									<ChatIcon />
								</IconButton>
							</Badge>
						</div>

						<Modal show={this.state.showModal} onHide={this.closeChat} style={{ zIndex: "999999" }}>
							<Modal.Header closeButton>
								<Modal.Title>Chat Room</Modal.Title>
							</Modal.Header>
							<Modal.Body style={{ overflow: "auto", overflowY: "auto", height: "400px", textAlign: "left" }} >
								{this.state.messages.length > 0 ? this.state.messages.map((item, index) => (
									<div key={index} style={{textAlign: "left"}}>
										<p style={{ wordBreak: "break-all" }}><b>{item.sender}</b>: {item.data}</p>
									</div>
								)) : <p>No message yet</p>}
							</Modal.Body>
							<Modal.Footer className="div-send-msg">
								<Input 
									placeholder="Message" 
									value={this.state.message} 
									onChange={e => this.handleMessage(e)}
									onKeyPress={(e) => {
										if (e.key === 'Enter') {
											this.sendMessage();
										}
									}}
								/>
								<Button variant="contained" color="primary" onClick={this.sendMessage}>Send</Button>
							</Modal.Footer>
						</Modal>

						<div className="container">
							<div className="room-link">
								{/* <TextField value={window.location.href} disable="true"></TextField><br /> */}
								<div>ROOM ID : {this.state.path[this.state.path.length-1]}</div><br />
								<Button variant="outlined" color="primary" className="copybtn" onClick={this.copyUrl}>Copy invite link</Button>
							</div>
							<div id="main" className="flex-container" style={{ margin: 0, padding: 0 }}>
								<video id={this.state.myVideoClass} ref={this.localVideoref} autoPlay muted>
								</video>
							</div>
						</div>
					</div>
				}
			</div>
		)
	}
}

export default Video