# Shubh Meet - Backend Server

A robust backend server for Shubh Meet video conferencing application built with Express.js, Socket.IO, MongoDB, and WebRTC.

## 🚀 Features

- **Real-time Video Conferencing**: WebRTC-based peer-to-peer communication
- **Instant Messaging**: Socket.IO powered chat system
- **User Authentication**: JWT-based authentication with Passport.js
- **Room Management**: Create and join video conference rooms
- **Group Chat**: Persistent group messaging with MongoDB storage
- **RESTful API**: Clean API endpoints for frontend integration
- **Security**: XSS protection, CORS configuration, input sanitization

## 🛠️ Tech Stack

- **Node.js & Express.js**: Server framework
- **Socket.IO**: Real-time bidirectional communication
- **MongoDB & Mongoose**: Database and ODM
- **Passport.js**: Authentication middleware
- **JWT**: Token-based authentication
- **WebRTC**: Peer-to-peer video communication

## 📦 Installation

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB:**
   ```bash
   # Make sure MongoDB is running on your system
   mongod
   ```

5. **Run the server:**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

## 🔧 Environment Variables

Create a `.env` file in the server directory:

```env
NODE_ENV=development
PORT=4001
MONGODB_URI=mongodb://localhost:27017/video
JWT_SECRET=your-secret-key
FACEBOOK_CLIENT_ID=your_facebook_app_id
FACEBOOK_CLIENT_SECRET=your_facebook_app_secret
ALLOWED_ORIGINS=http://localhost:8000,http://localhost:3000
```

## 📡 API Endpoints

### Authentication
- `POST /api/users/signup` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/checkJWTToken` - Validate JWT token

### Groups & Rooms
- `GET /api/groups` - Get user groups
- `POST /api/groups` - Create new group
- `GET /api/groups/:groupId` - Get group details

### Health Check
- `GET /api/health` - Server health status

## 🔌 Socket.IO Events

### Client to Server
- `join-call` - Join a video call room
- `signal` - WebRTC signaling
- `chat-message` - Send chat message

### Server to Client
- `user-joined` - User joined the room
- `user-left` - User left the room
- `chat-message` - Receive chat message
- `signal` - WebRTC signaling response

## 📁 Project Structure

```
server/
├── models/           # Mongoose models
│   ├── user.js
│   ├── message.js
│   └── groups.js
├── routes/           # Express routes
│   ├── index.js
│   ├── users.js
│   └── groupsRouter.js
├── app.js           # Main server file
├── config.js        # Configuration
├── authenticate.js  # Authentication middleware
├── package.json     # Dependencies
└── README.md        # This file
```

## 🔒 Security Features

- **XSS Protection**: Input sanitization using `xss` library
- **CORS Configuration**: Controlled cross-origin access
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: All user inputs are validated and sanitized

## 🚧 Development

### Scripts
- `npm run dev` - Start with nodemon for development
- `npm start` - Start production server
- `npm test` - Run tests (to be implemented)

### CORS Configuration
The server is configured to accept requests from:
- `http://localhost:8000` (Frontend development)
- `http://localhost:3000` (Alternative frontend port)

## 🐛 Troubleshooting

1. **MongoDB Connection Issues:**
   - Ensure MongoDB is running
   - Check connection string in environment variables

2. **CORS Errors:**
   - Verify frontend URL in ALLOWED_ORIGINS
   - Check if frontend is running on correct port

3. **Socket.IO Connection Issues:**
   - Ensure both frontend and backend are running
   - Check browser console for WebSocket errors

## 📝 License

This project is licensed under the ISC License.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

# Shubh Meet Backend Deployment

## Environment Variables Required

```bash
NODE_ENV=production
PORT=4001
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/shubhmeet
JWT_SECRET=your-super-secret-jwt-key-here
FRONTEND_URL=https://your-frontend-domain.netlify.app
```

## Railway Deployment

1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy from the `server` directory

## MongoDB Atlas Setup

1. Create account at mongodb.com/atlas
2. Create a new cluster
3. Add connection string to MONGO_URL environment variable
4. Whitelist Railway's IP addresses or use 0.0.0.0/0 for all IPs 