import React, {useEffect, useState} from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
import moment from 'moment';
import { useHistory, Link } from 'react-router-dom';
import './MessageList.css';
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
  const [roomId, setRoomId] = useState('');

  useEffect(() => {
    getMessages();

    return history.listen((location)=>{
      console.log(location);
      const currlocation = location.pathname.split("/");
      const roomId = currlocation[currlocation.length-1];
      if(roomId.length === 5)
      setRoomId(roomId);

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

      setRoomId(roomId);

      fetch(baseUrl+'groups/'+roomId, {
        method: 'GET',
        headers: myHeader
      })
      .then(response => response.json())
      .then((response) => {
        if(response.error) return;
          let tempMessages = response.map(result => {
            return {
              id: result._id,
              author: result.author,
              message: result.content,
              timestamp: result.createdAt
            };
          });
          setMessages([ ...messages,...tempMessages])
      })
      .catch((err)=>console.error(err));
      
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
    setMessages(msg=>[...msg,{ author: sender, message: data, id: '111', timestamp: new Date().getTime() }]);
	}

  const connectToSocketServer = () => {
    const socket = io.connect(baseUrl, {secure: true});
    setSocket(socket);
    // console.log(currsocket);

    socket.on('signal', gotMessageFromServer);

    socket.on('connect', ()=>{
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
    const sendMessage = (e) => {
      e.preventDefault();
      if(message==="") return;

      if(!mysocket){
        connectToSocketServer();
        return;
      }
      mysocket.emit('chat-message', message, username);
      setMessage('');
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
        
        if(prevBySameAuthor && previous.message===current.message){
          i++;
          continue;
        }

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

    if(roomId==='') return(
      <div>
        <div className="start-text-info">Choose a Conversation to chat</div>
        <div className="start-text-info">Click + option besides Messenger to start a new Conversation</div>
      </div>
    );
    else
    return(
      <div className="message-list">
        <Toolbar
          title={`Room_ID : ${roomId}`}
          rightItems={[
            <ToolbarButton key="info" icon="ion-ios-log-out" onClickfn={props.logoutUser}/>,
            <Link exact to={`/room/${roomId}`} ><ToolbarButton key="video" icon="ion-ios-videocam" /></Link>
          ]}
        />

        <div className="message-list-container">{renderMessages()}</div>
        <div className="wait"></div>


        <Compose message={message} sendMessage={sendMessage} handleMessage={handleMessage} rightItems={[
          <ToolbarButton key="send" icon="ion-ios-send" onClickfn={sendMessage}/>
        ]} />
      </div>
    );
}