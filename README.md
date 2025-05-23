# 🎥 Shubh Meet

A modern, full-stack video conferencing application with Microsoft Teams-inspired design. Built with React, Express.js, Socket.IO, MongoDB, and WebRTC.

## 🚀 Features

- **🎬 HD Video Conferencing**: WebRTC-powered peer-to-peer video calls
- **💬 Real-time Chat**: Instant messaging during video calls
- **🔐 Secure Authentication**: JWT-based user authentication
- **📱 Responsive Design**: Works on desktop, tablet, and mobile
- **🎨 Modern UI**: Microsoft Teams-inspired purple theme
- **⚡ Real-time Communication**: Socket.IO for instant updates
- **🏢 Room Management**: Create and join meeting rooms with ease
- **📊 User Dashboard**: Personal dashboard with meeting history

## 🏗️ Architecture

This is a **separated monorepo** with independently deployable frontend and backend:

```
shubh-meet/
├── client/          # React Frontend (Port 8000)
├── server/          # Express Backend (Port 4001)
├── package.json     # Workspace coordinator
└── README.md        # This file
```

### Frontend (React)
- **Framework**: React 16.13 with Redux
- **Styling**: Bootstrap 5 + Custom CSS
- **Real-time**: Socket.IO Client
- **Routing**: React Router
- **Build Tool**: Create React App

### Backend (Express)
- **Framework**: Express.js with Node.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js + JWT
- **Real-time**: Socket.IO Server
- **Security**: CORS, XSS protection

## 🚀 Quick Start

### Prerequisites
- **Node.js** >= 12.16.3
- **MongoDB** (running locally or remote)
- **Git**

### 1. Clone Repository
```bash
git clone https://github.com/your-username/shubh-meet.git
cd shubh-meet
```

### 2. Install All Dependencies
```bash
npm run install:all
```

### 3. Set Up Environment Variables

**Backend Configuration** (`server/.env`):
```env
NODE_ENV=development
PORT=4001
MONGODB_URI=mongodb://localhost:27017/video
JWT_SECRET=your-secret-key-here
```

**Frontend Configuration** (`client/.env.local`):
```env
REACT_APP_API_URL=http://localhost:4001/api
```

### 4. Start Development Servers
```bash
# Start both frontend and backend simultaneously
npm run dev

# Or start them separately:
npm run start:server  # Backend on http://localhost:4001
npm run start:client  # Frontend on http://localhost:8000
```

### 5. Open Application
Visit [http://localhost:8000](http://localhost:8000) in your browser.

## 📦 Available Scripts

### Root Level Commands
- `npm run install:all` - Install dependencies for both client and server
- `npm run dev` - Start both frontend and backend in development mode
- `npm run start:both` - Same as dev
- `npm run start:client` - Start only frontend
- `npm run start:server` - Start only backend
- `npm run build` - Build frontend for production
- `npm run test` - Run tests for both client and server
- `npm run clean` - Remove all node_modules directories

### Frontend Commands (from `/client`)
```bash
cd client
npm start          # Development server
npm run build      # Production build
npm test          # Run tests
```

### Backend Commands (from `/server`)
```bash
cd server
npm run dev       # Development with nodemon
npm start         # Production server
npm test         # Run tests
```

## 🌐 API Endpoints

### Authentication
- `POST /api/users/signup` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/checkJWTToken` - Token validation

### Groups & Rooms
- `GET /api/groups` - Get user groups
- `POST /api/groups` - Create new group
- `GET /api/groups/:groupId` - Get group details

### Health Check
- `GET /api/health` - Server status

## 🔌 Socket.IO Events

### Client → Server
- `join-call` - Join video conference room
- `signal` - WebRTC signaling data
- `chat-message` - Send chat message

### Server → Client
- `user-joined` - User joined the room
- `user-left` - User left the room
- `chat-message` - Receive chat message
- `signal` - WebRTC signaling response

## 🎨 Design System

### Color Palette
- **Primary**: `#6264a7` (Microsoft Teams Purple)
- **Success**: `#107c10`
- **Error**: `#d13438`
- **Text**: `#2c3e50`
- **Background**: `#f8faff` to `#e8f2ff`

### Key Components
- **Modern Button System**: Hover animations with translateY effects
- **Card-based Layout**: Shadow and gradient designs
- **Modal System**: Backdrop blur with slide animations
- **Responsive Grid**: Flexbox-based responsive layout

## 🔒 Security Features

- **XSS Protection**: Input sanitization using xss library
- **CORS Configuration**: Controlled cross-origin access
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: All user inputs validated and sanitized
- **Environment Variables**: Sensitive data stored in environment files

## 🌍 Deployment

### Frontend Deployment (Netlify/Vercel)
```bash
cd client
npm run build
# Deploy the 'build' folder
```

### Backend Deployment (Heroku/DigitalOcean)
```bash
cd server
# Set environment variables in your hosting platform
# Deploy the server directory
```

### Environment Variables for Production
**Backend**:
```env
NODE_ENV=production
PORT=4001
MONGODB_URI=your_mongodb_atlas_url
JWT_SECRET=your_production_secret
```

**Frontend**:
```env
REACT_APP_API_URL=https://your-backend-domain.com/api
```

## 📱 Browser Support

- **Chrome**: Latest 2 versions ✅
- **Firefox**: Latest 2 versions ✅
- **Safari**: Latest 2 versions ✅
- **Edge**: Latest 2 versions ✅

## 🐛 Troubleshooting

### Common Issues

1. **"Cannot connect to backend"**
   - Ensure backend server is running on port 4001
   - Check REACT_APP_API_URL in frontend environment

2. **"Database connection failed"**
   - Verify MongoDB is running
   - Check MONGODB_URI in backend environment

3. **"Socket.IO connection errors"**
   - Ensure CORS is properly configured
   - Check browser console for WebSocket errors

4. **"Build fails"**
   - Clear node_modules: `npm run clean`
   - Reinstall dependencies: `npm run install:all`
   - Check Node.js version compatibility

### Debug Mode
Enable debug logging in development:
```bash
# Backend
DEBUG=* npm run dev

# Frontend
REACT_APP_DEBUG_MODE=true npm start
```

## 🛠️ Development

### Code Structure
- **Frontend**: Component-based React architecture
- **Backend**: RESTful API with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Real-time**: Socket.IO for bidirectional communication

### Adding New Features
1. **Frontend**: Add components in `/client/src/Components`
2. **Backend**: Add routes in `/server/routes`
3. **Database**: Add models in `/server/models`

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Search existing [GitHub Issues](https://github.com/your-username/shubh-meet/issues)
3. Create a new issue with detailed information

## ⭐ Acknowledgments

- Microsoft Teams for design inspiration
- WebRTC community for real-time communication protocols
- Socket.IO team for excellent real-time framework
- React and Express.js communities

---

**Made with ❤️ by Shubhank Kulshrestha**
