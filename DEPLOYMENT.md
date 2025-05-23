# 🚀 Shubh Meet Deployment Guide

## Overview
This guide will help you deploy your video conferencing app to production using:
- **Backend**: Railway (Node.js + WebSocket support)
- **Frontend**: Netlify (React app hosting)
- **Database**: MongoDB Atlas (Cloud MongoDB)

## Prerequisites
- GitHub account
- Railway account (railway.app)
- Netlify account (netlify.com)
- MongoDB Atlas account (mongodb.com/atlas)

---

## 🗄️ Step 1: Set Up MongoDB Atlas

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/atlas](https://mongodb.com/atlas)
   - Sign up for free account

2. **Create a Cluster**
   - Choose "Build a Database" → "Shared" (Free)
   - Select your preferred cloud provider and region
   - Name your cluster (e.g., "shubh-meet-cluster")

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `shubhmeet-user`
   - Generate a strong password and save it
   - Give "Read and write to any database" privileges

4. **Configure Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Choose "Allow access from anywhere" (0.0.0.0/0)
   - This allows Railway to connect

5. **Get Connection String**
   - Go to "Databases" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string (it looks like):
   ```
   mongodb+srv://shubhmeet-user:<password>@shubh-meet-cluster.xyz.mongodb.net/?retryWrites=true&w=majority
   ```
   - Replace `<password>` with your actual password

---

## 🚄 Step 2: Deploy Backend to Railway

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project" → "Deploy from GitHub repo"
   - Connect your GitHub account if needed
   - Select your repository

3. **Configure Service**
   - Railway will detect your Node.js app
   - It should automatically deploy from the `server/` directory
   - If not, set the source directory to `server`

4. **Set Environment Variables**
   In Railway dashboard → Variables, add:
   ```bash
   NODE_ENV=production
   PORT=4001
   MONGO_URL=mongodb+srv://shubhmeet-user:YOUR_PASSWORD@shubh-meet-cluster.xyz.mongodb.net/shubhmeet?retryWrites=true&w=majority
   JWT_SECRET=generate-a-random-32-character-string-here
   FRONTEND_URL=https://your-app-name.netlify.app
   ```

5. **Generate Domain**
   - Go to Settings → Domains
   - Click "Generate Domain"
   - Copy the generated URL (e.g., `https://your-app-name.up.railway.app`)

---

## 🌐 Step 3: Deploy Frontend to Netlify

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **Create New Site**
   - Click "New site from Git"
   - Choose GitHub
   - Select your repository

3. **Configure Build Settings**
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `client/build`

4. **Set Environment Variables**
   In Netlify → Site settings → Environment variables, add:
   ```bash
   REACT_APP_API_URL=https://your-railway-app.up.railway.app/api/
   REACT_APP_BACKEND_URL=https://your-railway-app.up.railway.app
   ```

5. **Update Site Name** (Optional)
   - Go to Site settings → General → Site details
   - Change site name to something memorable

---

## 🔄 Step 4: Update Backend with Frontend URL

1. **Update Railway Environment Variables**
   - Go back to Railway dashboard
   - Update `FRONTEND_URL` with your Netlify URL:
   ```bash
   FRONTEND_URL=https://your-app-name.netlify.app
   ```

2. **Redeploy Backend**
   - Railway should auto-redeploy when you update environment variables

---

## ✅ Step 5: Test Your Deployment

1. **Test Backend**
   - Visit: `https://your-railway-app.up.railway.app/api/health`
   - Should return: `{"status":"OK","message":"Shubh Meet Backend Server is running"}`

2. **Test Frontend**
   - Visit: `https://your-app-name.netlify.app`
   - Should load the app homepage

3. **Test Full Functionality**
   - Sign up for a new account
   - Login
   - Create/join a room
   - Test video/audio permissions

---

## 🔒 Security Notes

- **JWT Secret**: Use a strong, random 32+ character string
- **MongoDB**: Consider restricting IP access to specific Railway IPs
- **HTTPS**: Both Railway and Netlify provide HTTPS by default
- **Environment Variables**: Never commit sensitive data to Git

---

## 🐛 Troubleshooting

### Backend Issues
- Check Railway logs for errors
- Verify MongoDB connection string
- Ensure all environment variables are set

### Frontend Issues
- Check browser console for errors
- Verify API URL in environment variables
- Check Netlify build logs

### CORS Issues
- Ensure `FRONTEND_URL` is correctly set in Railway
- Check that both HTTP and HTTPS versions are allowed

---

## 📦 Your Production URLs

After deployment, you'll have:
- **Frontend**: `https://your-app-name.netlify.app`
- **Backend**: `https://your-railway-app.up.railway.app`
- **API**: `https://your-railway-app.up.railway.app/api/`

---

## 🎉 Congratulations!

Your video conferencing app is now live and accessible to users worldwide!

### Features Available in Production:
- ✅ User registration and authentication
- ✅ Real-time video calling with WebRTC
- ✅ Screen sharing
- ✅ Text chat during calls
- ✅ Room-based conversations
- ✅ Mobile-friendly interface
- ✅ HTTPS security

Share your app with friends and colleagues! 🚀 