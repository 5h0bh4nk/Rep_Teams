# Welcome to Shubh_Meet

![node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)
![express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![mongo](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white)

# ![Shubh_Meet](demo.png)

_A video chat app built from scratch without the use of any public or pre existing APIs/SDKs like firebase/jitsi_
<br />

Video link : [youtube](https://youtu.be/OFZAdckRr3I)<br />
Demo link : [shubh-meet](https://shubh-meet.herokuapp.com)

## Features

- Instantly create a new room or join a new one 💬
- Video call with multiple people in real-time 📹
- Mute audio/video 🙊
- Share screen during video call 💻
- Chat before starting a video call by creating a new room in conversations tab 😇
- Chat with your friends during a video call 😜
- View the chats that happened in the video meet before you even joined to catch up with others if u are late 🤙
- Chat notifications 📸
- Continue your chat after the video call also ( includes your chats during the call ) 🤭
- Authentication support using passport and JWT tokens to prevent unknown users 🙌
- Simple and intuitive UI 😍
- XSS sanitization of chats (security 😉)
  <br /> <br />

## TechStacks / Modules used

- ReactJS - (reactstrap , materailUI, etc)
- Redux
- Passport auth
- Express
- MongoDB
- SocketIO
- WebRTC
- and others

<br />

## API endpoints

- /users (admin only)
- /users/login
- /users/signup
- /facebook/token (fb auth)
- /users/checkJWTToken
- /groups (to fetch groups of user)
- /groups/:roomId ( to fetch messages )

<br />

## Requirements

### To be able to run this app locally :

- you need to have Nodejs installed
- you need to have node package manager , npm or yarn( preferable )
- It currently uses a free and limited storage mongoDB cluster . To use local database or your database , change the mongoUrl in [config.js](config.js) . ( Use 'localhost:27017' for using local mongoDB and execute `mongo run` command on your terminal before using ) .
  <br /><br />

## Installation / Local Setup

### **Running locally ( production server )**

#### `Step 1` - clone the repo

```bash
$ git clone https://github.com/5h0bh4nk/SHUBH_TEAMS_
```

#### `Step 2` - cd in the repo

```bash
$ cd SHUBH_TEAMS_
```

#### `Step 3` - install dependencies

```bash
$ yarn install
```

#### `Step 4` - Build the react app

```bash
$ yarn build
```

#### `Step 5` - run application

```bash
$ yarn start
```

In browser, open [http://localhost:4001](http://localhost:4001)

<br />

### **Running locally ( Development server )**

#### `Step 1` - clone the repo

```bash
$ git clone https://github.com/5h0bh4nk/SHUBH_TEAMS_
```

#### `Step 2` - cd in the repo

```bash
$ cd SHUBH_TEAMS_
```

#### `Step 3` - install dependencies

```bash
$ yarn install
```

#### `Step 4` - run application

```bash
$ yarn dev
```

In browser, open [http://localhost:8000](http://localhost:8000)

<br />



## Code Structure

```bash
- 📂 __CODE STRUCTURE___
   - 📄 [README.md](README.md)
   - 📄 [app.js](app.js)
   - 📄 [authenticate.js](authenticate.js)
   - 📄 [cicd.jpg](cicd.jpg)
   - 📂 __client__
     - 📄 [package.json](client/package.json)
     - 📂 __public__
       - 📄 [icon.png](client/public/icon.png)
       - 📄 [index.html](client/public/index.html)
       - 📄 [manifest.json](client/public/manifest.json)
       - 📄 [package.json](client/public/package.json)
       - 📄 [robots.txt](client/public/robots.txt)
     - 📂 __src__
       - 📄 [App.js](client/src/App.js)
       - 📂 __Components__
         - 📂 __ContactBar__
           - 📄 [ContactBar.css](client/src/Components/ContactBar/ContactBar.css)
           - 📄 [ContactBar.js](client/src/Components/ContactBar/ContactBar.js)
         - 📂 __Header__
           - 📄 [Header.css](client/src/Components/Header/Header.css)
           - 📄 [Header.js](client/src/Components/Header/Header.js)
         - 📂 __Jumbotron__
           - 📄 [jumbotron.css](client/src/Components/Jumbotron/jumbotron.css)
           - 📄 [jumbotron.js](client/src/Components/Jumbotron/jumbotron.js)
         - 📂 __Navbar__
           - 📄 [Navbar.css](client/src/Components/Navbar/Navbar.css)
           - 📄 [Navbar.js](client/src/Components/Navbar/Navbar.js)
         - 📂 __SignButtons__
           - 📄 [SignButtons.css](client/src/Components/SignButtons/SignButtons.css)
           - 📄 [SignButtons.js](client/src/Components/SignButtons/SignButtons.js)
       - 📂 __Containers__
         - 📂 __Dashboard__
           - 📄 [Dashboard.css](client/src/Containers/Dashboard/Dashboard.css)
           - 📄 [Dashboard.js](client/src/Containers/Dashboard/Dashboard.js)
         - 📂 __Homepage__
           - 📄 [Homepage.css](client/src/Containers/Homepage/Homepage.css)
           - 📄 [Homepage.js](client/src/Containers/Homepage/Homepage.js)
         - 📂 __Login__
           - 📄 [Login.css](client/src/Containers/Login/Login.css)
           - 📄 [Login.js](client/src/Containers/Login/Login.js)
         - 📂 __MeetStart__
           - 📄 [Home.css](client/src/Containers/MeetStart/Home.css)
           - 📄 [Home.js](client/src/Containers/MeetStart/Home.js)
         - 📂 __Room__
           - 📂 __Helpers__
             - 📄 [peerConnectionConfig.js](client/src/Containers/Room/Helpers/peerConnectionConfig.js)
             - 📄 [server\_url.js](client/src/Containers/Room/Helpers/server_url.js)
           - 📄 [Video.css](client/src/Containers/Room/Video.css)
           - 📄 [Video.js](client/src/Containers/Room/Video.js)
         - 📂 __Signup__
           - 📄 [Signup.css](client/src/Containers/Signup/Signup.css)
           - 📄 [Signup.js](client/src/Containers/Signup/Signup.js)
       - 📂 __Messenger__
         - 📂 __App__
           - 📄 [App.test.js](client/src/Messenger/App/App.test.js)
           - 📄 [index.js](client/src/Messenger/App/index.js)
         - 📂 __Compose__
           - 📄 [Compose.css](client/src/Messenger/Compose/Compose.css)
           - 📄 [index.js](client/src/Messenger/Compose/index.js)
         - 📂 __ConversationList__
           - 📄 [ConversationList.css](client/src/Messenger/ConversationList/ConversationList.css)
           - 📄 [Dropdown.js](client/src/Messenger/ConversationList/Dropdown.js)
           - 📄 [index.js](client/src/Messenger/ConversationList/index.js)
         - 📂 __ConversationListItem__
           - 📄 [ConversationListItem.css](client/src/Messenger/ConversationListItem/ConversationListItem.css)
           - 📄 [index.js](client/src/Messenger/ConversationListItem/index.js)
         - 📂 __ConversationSearch__
           - 📄 [ConversationSearch.css](client/src/Messenger/ConversationSearch/ConversationSearch.css)
           - 📄 [index.js](client/src/Messenger/ConversationSearch/index.js)
         - 📂 __Message__
           - 📄 [Message.css](client/src/Messenger/Message/Message.css)
           - 📄 [index.js](client/src/Messenger/Message/index.js)
         - 📂 __MessageList__
           - 📄 [MessageList.css](client/src/Messenger/MessageList/MessageList.css)
           - 📄 [index.js](client/src/Messenger/MessageList/index.js)
         - 📂 __Messenger__
           - 📄 [Messenger.css](client/src/Messenger/Messenger/Messenger.css)
           - 📄 [Messenger.js](client/src/Messenger/Messenger/Messenger.js)
           - 📄 [index.js](client/src/Messenger/Messenger/index.js)
         - 📂 __Toolbar__
           - 📄 [Toolbar.css](client/src/Messenger/Toolbar/Toolbar.css)
           - 📄 [index.js](client/src/Messenger/Toolbar/index.js)
         - 📂 __ToolbarButton__
           - 📄 [ToolbarButton.css](client/src/Messenger/ToolbarButton/ToolbarButton.css)
           - 📄 [index.js](client/src/Messenger/ToolbarButton/index.js)
       - 📄 [index.js](client/src/index.js)
       - 📂 __redux__
         - 📄 [ActionCreators.js](client/src/redux/ActionCreators.js)
         - 📄 [ActionTypes.js](client/src/redux/ActionTypes.js)
         - 📄 [auth.js](client/src/redux/auth.js)
         - 📄 [configureStore.js](client/src/redux/configureStore.js)
         - 📄 [forms.js](client/src/redux/forms.js)
       - 📄 [serviceWorker.js](client/src/serviceWorker.js)
       - 📂 __shared__
         - 📄 [basUrl.js](client/src/shared/basUrl.js)
         - 📂 __images__
           - 📄 [demo.webp](client/src/shared/images/demo.webp)
           - 📄 [logo\-icon.png](client/src/shared/images/logo-icon.png)
           - 📄 [logo\-white.png](client/src/shared/images/logo-white.png)
           - 📄 [mslogo.svg](client/src/shared/images/mslogo.svg)
         - 📂 __storage__
           - 📄 [data.js](client/src/shared/storage/data.js)
   - 📄 [config.js](config.js)
   - 📄 [demo.png](demo.png)
   - 📄 [list.md](list.md)
   - 📄 [package.json](package.json)
   - 📄 [procfile](procfile)
   - 📂 __server__
     - 📂 __models__
       - 📄 [groups.js](server/models/groups.js)
       - 📄 [message.js](server/models/message.js)
       - 📄 [user.js](server/models/user.js)
     - 📂 __routes__
       - 📄 [cors.js](server/routes/cors.js)
       - 📄 [groupsRouter.js](server/routes/groupsRouter.js)
       - 📄 [index.js](server/routes/index.js)
       - 📄 [users.js](server/routes/users.js)


```
