import React, {useEffect, useState} from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import './MessageList.css';
import {Input, Button} from '@material-ui/core'
import io from 'socket.io-client'
import {baseUrl} from '../../shared/basUrl'
import {peerConnectionConfig} from '../../Containers/Room/Helpers/peerConnectionConfig';

export default function MessageList(props) {
  const MY_USER_ID = localStorage.getItem("creds").split('"')[3];
  const [myconnections,setConnections] = useState({});
  const [mysocket, setSocket] = useState(null);
  var socketId = null
  const [message,setMessage] = useState('');
  const [messages, setMessages] = useState([])
  const history = useHistory();


  useEffect(() => {
    
    return history.listen((location)=>{
      connectToSocketServer();
      getMessages();
    })
  },[history])

  
  const getMessages = () => {
      const myHeader = new Headers();
      myHeader.append('Accept', 'application/json');
      myHeader.append('Content-Type', 'application/json');
      myHeader.append('Authorization', 'bearer '+ localStorage.getItem("token"));

      const location = window.location.href.split("/");
      const roomId = location[location.length-1];

      if(roomId.length !== 5) return;

      fetch(baseUrl+'groups/'+roomId, {
        method: 'GET',
        headers: myHeader
      })
      .then(response => response.json())
      .then(response => {
        console.log("RESPONSE CONVOS",response);
          let tempMessages = response.map(result => {
            return {
              id: result._id,
              author: result.author,
              message: result.content,
              timestamp: result.createdAt
            };
          });
          console.log(tempMessages);
          setMessages([ ...messages,...tempMessages])
      });
      
  }

  const gotMessageFromServer = (fromId, message) => {
		var signal = JSON.parse(message)

		if (fromId !== socketId) {
			if (signal.sdp) {
        var connections = myconnections;
				connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
					if (signal.sdp.type === 'offer') {
						connections[fromId].createAnswer().then((description) => {
							connections[fromId].setLocalDescription(description).then(() => {
								mysocket.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }))
							}).catch(e => console.log(e))
						}).catch(e => console.log(e))
					}
				}).catch(e => console.log(e))
			}

			if (signal.ice) {
				connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e))
			}

      setConnections(connections);
		}
	}

  const addMessage = (data, sender, socketIdSender) => {
		console.log(data);
    setMessages(msg=>[...msg,{ author: sender, message: data, id: '111', timestamp: "2021-07-09T13:14:28.527Z" }]);
    // this.setState(prevState => ({
		// 	messages: [...prevState.messages, { "sender": sender, "data": data }],
		// }))

	}

  const connectToSocketServer = () => {
    const socket = io.connect(baseUrl, {secure: true});
    setSocket(socket);
    // console.log(currsocket);

    socket.on('signal', gotMessageFromServer);

    socket.on('connect', ()=>{

        const room = window.location.href.split("/");
        const roomId = room[room.length-1]
        socket.emit('join-call',{path: window.location.href, userId: localStorage.getItem("creds").split('"')[3]});
        const socketId = socket.id;
        console.log(socketId);
        socket.on('chat-message', addMessage);

        socket.on('user-left', (id)=>{
            console.log("User left");
        });

        socket.on('user-joined', (id,clients)=>{
          var connections = myconnections;
          clients.forEach((socketListId) => {
            connections[socketListId] = new RTCPeerConnection(peerConnectionConfig)
            // Wait for their ice candidate       
            connections[socketListId].onicecandidate = function (event) {
              if (event.candidate != null) {
                socket.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }))
              }
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

          setConnections(connections);
        });
      })
    }

    const username = localStorage.getItem("creds").split('"')[3];
    const handleMessage = (e) => setMessage(e.target.value);
    const sendMessage = () => {
      if(message==="") return;

      if(!mysocket){
        connectToSocketServer();
        // console.log("CONNECTING TO SOCKET");
        // document.querySelector('wait').innerHTML="Wait for server";
        return;
      }
      console.log("messages before", messages);
      mysocket.emit('chat-message', message, username);
      // setMessages([...messages, { author: MY_USER_ID, message: message, id: '111', timestamp: "2021-07-09T13:14:28.527Z" }]);
      console.log({ "author": MY_USER_ID, "message": message, "id": '111', "timestamp": "2021-07-09T13:14:28.527Z" });
      setMessage('');
      // console.log("messages ", messages);
      renderMessages();
    }

  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.author === MY_USER_ID;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.author === current.author;
        
        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  }

    return(
      <div className="message-list">
        <Toolbar
          title="Conversation Title"
          rightItems={[
            <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
            <ToolbarButton key="video" icon="ion-ios-videocam" />,
            <ToolbarButton key="phone" icon="ion-ios-call" />
          ]}
        />

        <div className="message-list-container">{renderMessages()}</div>
        <Input placeholder="Message" value={message} onChange={e => handleMessage(e)}/>
				<Button variant="contained" color="primary" onClick={sendMessage}>Send</Button>
        <div className="wait"></div>


        <Compose rightItems={[
          <ToolbarButton key="photo" icon="ion-ios-camera" />,
          <ToolbarButton key="image" icon="ion-ios-image" />,
          <ToolbarButton key="audio" icon="ion-ios-mic" />,
          <ToolbarButton key="money" icon="ion-ios-card" />,
          <ToolbarButton key="games" icon="ion-logo-game-controller-b" />,
          <ToolbarButton key="emoji" icon="ion-ios-happy" />
        ]} />
      </div>
    );
}