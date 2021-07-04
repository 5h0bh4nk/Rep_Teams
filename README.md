# MeetChat

### Features
- No account needed ( Need to add auth )
- Messaging chat and video streaming in real-time
- Screen sharing to present documents, slides, and more
- Everyting is peer-to-peer (using mesh method)
- smooth UI and UX setup
- more to be added soon

### Local setup

1. `yarn install`
2. `yarn dev`
3. `go to /home for frontend`
4. `/room for chatrooms`

### process

1. Each peer creates an RTCPeerConnection object representing their end of the WebRTC session.
2. Each peer establishes a handler for icecandidate events, which handles sending those candidates to the other peer over the signaling channel.
3. Each peer establishes a handler for track event, which is received when the remote peer adds a track to the stream. This code should connect the tracks to its consumer, such as a <video> element.
4. The caller creates and shares with the receiving peer a unique identifier or token of some kind so that the call between them can be identified by the code on the signaling server. The exact contents and form of this identifier is up to you.
5. Each peer connects to an agreed-upon signaling server, such as a WebSocket server they both know how to exchange messages with.
6. Each peer tells the signaling server that they want to join the same WebRTC session (identified by the token established in step 4).