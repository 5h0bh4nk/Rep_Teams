import io from 'socket.io-client';
import peerConnectionConfig from './peerConnectionConfig';
const server_url = (process.env.NODE_ENV === 'production') ? 'https://shubh-meet.herokuapp.com/' : "http://localhost:4001"

export function connectToSocketServer(socket, elms, socketId, connections){
    socket = io.connect(server_url, { secure: true })

    socket.on('signal', gotMessageFromServer)

    socket.on('connect', () => {
        socket.emit('join-call', window.location.href)
        socketId = socket.id

        socket.on('chat-message', addMessage(socketId, data, sender, socketIdSender))

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

export function gotMessageFromServer(socket,socketId,connections,fromId, message){
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

    export function addMessage (socketId, data, sender, socketIdSender){
		this.setState(prevState => ({
			messages: [...prevState.messages, { "sender": sender, "data": data }],
		}))
		if (socketIdSender !== socketId) {
			this.setState({ newmessages: this.state.newmessages + 1 })
		}
	}