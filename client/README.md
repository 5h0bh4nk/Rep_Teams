# Shubh Meet - Frontend

A modern, responsive React frontend for Shubh Meet video conferencing application with Microsoft Teams-inspired design.

## 🚀 Features

- **Modern UI Design**: Microsoft Teams-inspired interface with purple theme
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Video Calls**: WebRTC-powered video conferencing
- **Instant Messaging**: Socket.IO integration for real-time chat
- **User Authentication**: JWT-based secure authentication
- **Room Management**: Create and join video conference rooms
- **Redux State Management**: Centralized state management
- **Smooth Animations**: CSS transitions and page animations

## 🛠️ Tech Stack

- **React 16.13**: Frontend framework
- **Redux & Redux Thunk**: State management
- **React Router**: Client-side routing
- **Bootstrap 5**: CSS framework
- **Material-UI**: React component library
- **Socket.IO Client**: Real-time communication
- **Axios**: HTTP client for API calls
- **Flexbox Grid**: Layout system

## 📦 Installation

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   # Create .env.local file (optional)
   REACT_APP_API_URL=http://localhost:4001/api
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

## 🎨 Design System

### Color Palette
- **Primary**: `#6264a7` (Microsoft Teams Purple)
- **Success**: `#107c10` (Green)
- **Error**: `#d13438` (Red)
- **Text**: `#2c3e50` (Dark Blue-Gray)
- **Background**: `#f8faff` to `#e8f2ff` (Light Blue Gradient)

### Typography
- **Primary Font**: Segoe UI
- **Fallbacks**: -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue

### Components
- **Buttons**: Modern design with hover animations
- **Cards**: Shadow-based design with gradients
- **Modals**: Backdrop blur with slide animations
- **Forms**: Clean, accessible form controls

## 📁 Project Structure

```
client/
├── public/           # Static assets
├── src/
│   ├── Components/   # Reusable components
│   │   ├── Navbar/
│   │   ├── Jumbotron/
│   │   ├── SignButtons/
│   │   └── ...
│   ├── Containers/   # Page containers
│   │   ├── Homepage/
│   │   ├── Dashboard/
│   │   └── Room/
│   ├── redux/        # Redux store and actions
│   ├── shared/       # Shared utilities and assets
│   ├── App.js        # Main app component
│   └── index.js      # Entry point
├── package.json      # Dependencies
└── README.md         # This file
```

## 🔧 Environment Variables

Create a `.env.local` file in the client directory:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:4001/api

# Feature Flags (optional)
REACT_APP_ENABLE_ANALYTICS=false
REACT_APP_DEBUG_MODE=true
```

## 📱 Available Scripts

- **`npm start`**: Starts development server on port 8000
- **`npm run start:dev`**: Starts with development environment variables
- **`npm run build`**: Creates production build
- **`npm test`**: Runs test suite
- **`npm run eject`**: Ejects from Create React App (⚠️ irreversible)

## 🌐 API Integration

The frontend communicates with the backend server through:

- **REST API**: Authentication, user management, groups
- **Socket.IO**: Real-time messaging and WebRTC signaling
- **Base URL**: Configured in `src/shared/basUrl.js`

### API Endpoints Used
- `POST /api/users/signup` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/checkJWTToken` - Token validation
- `GET /api/groups` - Fetch user groups

## 🎯 Key Features

### Authentication Flow
1. User registers/logs in through modal forms
2. JWT token stored in localStorage
3. Protected routes require authentication
4. Automatic token validation on app load

### Video Conferencing
1. Join/create rooms with 5-character room IDs
2. WebRTC peer-to-peer connections
3. Socket.IO for signaling and room management
4. Real-time chat during calls

### Responsive Design
- **Desktop**: Full sidebar navigation, large video grid
- **Tablet**: Collapsible navigation, adaptive layout
- **Mobile**: Bottom navigation, stacked video layout

## 🔒 Security Features

- **XSS Prevention**: Input sanitization
- **CSRF Protection**: Token-based authentication
- **Secure Storage**: JWT tokens in localStorage
- **Route Protection**: Private route components

## 🚧 Development

### Proxy Configuration
Development server proxies API requests to `http://localhost:4001`

### Hot Reloading
Automatic browser refresh on file changes during development

### CSS Architecture
- Global styles in `index.css`
- Component-specific CSS files
- Bootstrap utilities for rapid development

## 🐛 Troubleshooting

1. **API Connection Issues:**
   - Ensure backend server is running on port 4001
   - Check REACT_APP_API_URL environment variable

2. **Socket.IO Connection Errors:**
   - Verify backend Socket.IO CORS configuration
   - Check browser console for WebSocket errors

3. **Build Issues:**
   - Clear node_modules and package-lock.json
   - Run `npm install` again
   - Check Node.js version compatibility

## 📱 Browser Support

- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions  
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions

## 🎨 Customization

### Theme Colors
Update colors in component CSS files:
- Primary: `#6264a7`
- Success: `#107c10`
- Error: `#d13438`

### Fonts
Update font family in `index.css`:
```css
font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', sans-serif;
```

## 📝 License

This project is licensed under the ISC License.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request 