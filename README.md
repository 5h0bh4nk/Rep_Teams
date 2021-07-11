# MeetChat
# ![WebApp](https://iharsh234.github.io/WebApp/images/demo/demo_landing.JPG)

## Features
- Authentication using JWT tokens
- Messaging chat and video streaming in real-time
- Screen sharing to present documents, slides, and more
- Everyting is peer-to-peer (using mesh method)
- smooth UI and UX setup
- *chat support for people who get late also
- xss sanitization of inputs
- Coversations after the meet abd before meet also

## Local setup

1. `yarn install`
2. `yarn dev`
3. `go to /home for frontend`
4. `/room for chatrooms`

## Process

1. Each peer creates an RTCPeerConnection object representing their end of the WebRTC session.
2. Each peer establishes a handler for icecandidate events, which handles sending those candidates to the other peer over the signaling channel.
3. Each peer establishes a handler for track event, which is received when the remote peer adds a track to the stream. This code should connect the tracks to its consumer, such as a 'video' element.
4. The caller creates and shares with the receiving peer a unique identifier or token of some kind so that the call between them can be identified by the code on the signaling server. The exact contents and form of this identifier is up to you.
5. Each peer connects to an agreed-upon signaling server, such as a WebSocket server they both know how to exchange messages with.
6. Each peer tells the signaling server that they want to join the same WebRTC session (identified by the token established in step 4).


## Code Structure

```bashrc
- 📂 __CODE STRUCTURE__
   - 📄 [Procfile](Procfile)
   - 📄 [README.md](README.md)
   - 📄 [app.js](app.js)
   - 📄 [authenticate.js](authenticate.js)
   - 📄 [config.js](config.js)
   - 📄 [list.md](list.md)
   - 📂 __models__
     - 📄 [groups.js](models/groups.js)
     - 📄 [message.js](models/message.js)
     - 📄 [user.js](models/user.js)
   - 📄 [node\_modules](node_modules)
   - 📄 [package.json](package.json)
   - 📂 __public__
     - 📄 [icon.png](public/icon.png)
     - 📄 [index.html](public/index.html)
     - 📄 [manifest.json](public/manifest.json)
     - 📄 [package.json](public/package.json)
     - 📄 [robots.txt](public/robots.txt)
   - 📂 __routes__
     - 📄 [cors.js](routes/cors.js)
     - 📄 [groupsRouter.js](routes/groupsRouter.js)
     - 📄 [index.js](routes/index.js)
     - 📄 [users.js](routes/users.js)
   - 📂 __src__
     - 📄 [App.js](src/App.js)
     - 📂 __Components__
       - 📂 __ContactBar__
         - 📄 [ContactBar.css](src/Components/ContactBar/ContactBar.css)
         - 📄 [ContactBar.js](src/Components/ContactBar/ContactBar.js)
       - 📂 __Header__
         - 📄 [Header.css](src/Components/Header/Header.css)
         - 📄 [Header.js](src/Components/Header/Header.js)
       - 📂 __Jumbotron__
         - 📄 [jumbotron.css](src/Components/Jumbotron/jumbotron.css)
         - 📄 [jumbotron.js](src/Components/Jumbotron/jumbotron.js)
       - 📂 __Navbar__
         - 📄 [Navbar.css](src/Components/Navbar/Navbar.css)
         - 📄 [Navbar.js](src/Components/Navbar/Navbar.js)
       - 📂 __SignButtons__
         - 📄 [SignButtons.css](src/Components/SignButtons/SignButtons.css)
         - 📄 [SignButtons.js](src/Components/SignButtons/SignButtons.js)
     - 📂 __Containers__
       - 📂 __Dashboard__
         - 📄 [Dashboard.css](src/Containers/Dashboard/Dashboard.css)
         - 📄 [Dashboard.js](src/Containers/Dashboard/Dashboard.js)
       - 📂 __Homepage__
         - 📄 [Homepage.css](src/Containers/Homepage/Homepage.css)
         - 📄 [Homepage.js](src/Containers/Homepage/Homepage.js)
       - 📂 __Login__
         - 📄 [Login.css](src/Containers/Login/Login.css)
         - 📄 [Login.js](src/Containers/Login/Login.js)
       - 📂 __MeetStart__
         - 📄 [Home.css](src/Containers/MeetStart/Home.css)
         - 📄 [Home.js](src/Containers/MeetStart/Home.js)
       - 📂 __Room__
         - 📂 __Helpers__
           - 📄 [peerConnectionConfig.js](src/Containers/Room/Helpers/peerConnectionConfig.js)
           - 📄 [server\_url.js](src/Containers/Room/Helpers/server_url.js)
         - 📄 [Video.css](src/Containers/Room/Video.css)
         - 📄 [Video.js](src/Containers/Room/Video.js)
       - 📂 __Signup__
         - 📄 [Signup.css](src/Containers/Signup/Signup.css)
         - 📄 [Signup.js](src/Containers/Signup/Signup.js)
     - 📂 __Messenger__
       - 📂 __App__
         - 📄 [App.test.js](src/Messenger/App/App.test.js)
         - 📄 [index.js](src/Messenger/App/index.js)
       - 📂 __Compose__
         - 📄 [Compose.css](src/Messenger/Compose/Compose.css)
         - 📄 [index.js](src/Messenger/Compose/index.js)
       - 📂 __ConversationList__
         - 📄 [ConversationList.css](src/Messenger/ConversationList/ConversationList.css)
         - 📄 [Dropdown.js](src/Messenger/ConversationList/Dropdown.js)
         - 📄 [index.js](src/Messenger/ConversationList/index.js)
       - 📂 __ConversationListItem__
         - 📄 [ConversationListItem.css](src/Messenger/ConversationListItem/ConversationListItem.css)
         - 📄 [index.js](src/Messenger/ConversationListItem/index.js)
       - 📂 __ConversationSearch__
         - 📄 [ConversationSearch.css](src/Messenger/ConversationSearch/ConversationSearch.css)
         - 📄 [index.js](src/Messenger/ConversationSearch/index.js)
       - 📂 __Message__
         - 📄 [Message.css](src/Messenger/Message/Message.css)
         - 📄 [index.js](src/Messenger/Message/index.js)
       - 📂 __MessageList__
         - 📄 [MessageList.css](src/Messenger/MessageList/MessageList.css)
         - 📄 [index.js](src/Messenger/MessageList/index.js)
       - 📂 __Messenger__
         - 📄 [Messenger.css](src/Messenger/Messenger/Messenger.css)
         - 📄 [index.js](src/Messenger/Messenger/index.js)
       - 📂 __Toolbar__
         - 📄 [Toolbar.css](src/Messenger/Toolbar/Toolbar.css)
         - 📄 [index.js](src/Messenger/Toolbar/index.js)
       - 📂 __ToolbarButton__
         - 📄 [ToolbarButton.css](src/Messenger/ToolbarButton/ToolbarButton.css)
         - 📄 [index.js](src/Messenger/ToolbarButton/index.js)
     - 📄 [index.js](src/index.js)
     - 📂 __redux__
       - 📄 [ActionCreators.js](src/redux/ActionCreators.js)
       - 📄 [ActionTypes.js](src/redux/ActionTypes.js)
       - 📄 [auth.js](src/redux/auth.js)
       - 📄 [configureStore.js](src/redux/configureStore.js)
       - 📄 [forms.js](src/redux/forms.js)
     - 📄 [serviceWorker.js](src/serviceWorker.js)
     - 📂 __shared__
       - 📄 [basUrl.js](src/shared/basUrl.js)
       - 📂 __images__
         - 📄 [demo.webp](src/shared/images/demo.webp)
         - 📄 [logo\-icon.png](src/shared/images/logo-icon.png)
         - 📄 [logo\-white.png](src/shared/images/logo-white.png)
         - 📄 [mslogo.svg](src/shared/images/mslogo.svg)
       - 📂 __storage__
         - 📄 [data.js](src/shared/storage/data.js)
   - 📄 [yarn.lock](yarn.lock)
```
