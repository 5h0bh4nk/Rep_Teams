const express = require('express');
const http = require('http');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');
const Chat = require('./models/message');
const Group = require('./models/groups');
const createError = require('http-errors');

//to know the current room url
const path = require("path");
var xss = require("xss");
var passport = require('passport');
const cors=require('cors');
var config = require('./config');
var authenticate = require('./authenticate');

const url = config.mongoUrl;
mongoose.connect(url, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
})
.then(() => console.log("Database connected..."))
.catch((error) => console.log(error.message));

var server = http.createServer(app);
var io = require('socket.io')(server, {
	cors: {
		origin: [
			"http://localhost:8000", 
			"http://localhost:3000", 
			"http://192.168.1.9:8000", 
			"http://192.168.1.9:3000",
			"https://shubhankteams.netlify.app",
			process.env.FRONTEND_URL
		].filter(Boolean),
		methods: ["GET", "POST"],
		credentials: true
	}
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var groupsRouter = require('./routes/groupsRouter');

// Set port - use environment variable for production
app.set('port', (process.env.PORT || 4001))

// Get frontend URL from environment
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:8000';

// maintaining cors ( cross origin resource sharing ) / vulnerabilty
app.use(cors({
	origin: [
		"http://localhost:8000", 
		"http://localhost:3000", 
		"http://192.168.1.9:8000", 
		"http://192.168.1.9:3000",
		"https://shubhankteams.netlify.app",
		process.env.FRONTEND_URL
	].filter(Boolean),
	methods: ["GET", "POST", "PUT", "DELETE"],
	credentials: true
}));
app.use(bodyParser.json())

// preventing xss attacks / vulnerability tag
const sanitizeString = (str) => {
	return xss(str)
}

// connections are the unique rooms present on server
var connections = {}

// messages across the rooms
var messages = {}

var timeOnline = {}

// socket io for handling messages of rooms
io.on('connection', (socket) => {
	console.log('User connected:', socket.id);
	
	// socket = client
	// adding connection
	socket.on('join-call', (data) => {
		var path = data.path.split("/");
		const userId = data.userId;
		const roomId = path[path.length-1];

		path = data.path;

		// save group name to user data
		User.findOne({username: userId})
		.then((user)=>{
			if(!user.groups.includes(roomId) && roomId.length === 5)
			user.groups.push(roomId);
			user.save();
		})
		.catch((err)=> console.error(err));

		// make a group with roomId and push members
		Group.findOne({groupId: roomId})
		.then((group)=>{
			if(!group){
				if(roomId.length!==5){
					throw new Error("Incorrect Room ID");
				}
				Group.create({groupId: roomId})
				.then((group)=>{
					group.members.push(userId);
					group.save();
				})
			}
			else{
				if(!group.members.includes(userId))
				group.members.push(userId);
				group.save();
			}
		})
		.catch((err)=> console.error(err));

		// make connections to current room
		if(connections[path] === undefined){
			connections[path] = []
		}

		// when someone joins call , pushing his socketID to the connection array
		connections[path].push(socket.id)

		// store time online of that person
		timeOnline[socket.id] = new Date()

		// emit the person joined to all other connections present on the call
		for(let i = 0; i < connections[path].length; ++i){
			io.to(connections[path][i]).emit('user-joined', socket.id, connections[path])
		}

		// render all the messages that already have already been messaged by people in room
		if(messages[path] !== undefined){
			for(let i = 0; i < messages[path].length; ++i){
				io.to(socket.id).emit('chat-message', messages[path][i]['data'], 
					messages[path][i]['sender'], messages[path][i]['socket-id-sender'])
			}
		}

		//test purpose
		if(process.env.NODE_ENV !== 'production')
		console.log(path, connections[path])
	})

	// on signal incoming
	socket.on('signal', (toId, message) => {
		io.to(toId).emit('signal', socket.id, message)
	})

	// on sending of a chat message
	socket.on('chat-message', (data, sender) => {

		// sanitising input for security purpose
		data = sanitizeString(data);
		sender = sanitizeString(sender);
		var key;
		var ok = false;

		// finding from all the rooms present on web
		// k is the room key and v are the peers prsent the 
		for (const [k, v] of Object.entries(connections)) {
			for(let a = 0; a < v.length; ++a){
				if(v[a] === socket.id){
					key = k
					ok = true
					break;
				}
			}
			if(ok) break;
		}
		
		// sending message if present on server room
		if(ok){
			if(messages[key] === undefined){
				messages[key] = []
			}

			messages[key].push({"sender": sender, "data": data, "socket-id-sender": socket.id});
			
			// storing chat messages into the room
			Chat.create({content: data, author: sender })
			.then((chatMsg)=>{
				const roomPath = key.split("/");
				const roomId = roomPath[roomPath.length-1];
				console.log("ROOM",roomId);
				Group.findOne({groupId: roomId})
				.then((group)=>{
					group.messages.push(chatMsg);
					group.save();
				}, (err)=> console.error(err))
				.catch((err)=> console.error(err));

				chatMsg.save();
			}, (err)=> console.error(err))
			.catch((err)=> console.error(err));


			// test purpose
			if(process.env.NODE_ENV !== 'production')
			console.log("message", key, ":", sender, data)
			
			// emitting message to all in the room
			for(let a = 0; a < connections[key].length; ++a){
				io.to(connections[key][a]).emit("chat-message", data, sender, socket.id)
			}
		}
	})

	// on disconnection of user
	socket.on('disconnect', () => {
		console.log('User disconnected:', socket.id);
		var diffTime = Math.abs(timeOnline[socket.id] - new Date());
		var key;

		// finding the room 
		for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {
			for(let a = 0; a < v.length; ++a){
				if(v[a] === socket.id){
					key = k

					for(let a = 0; a < connections[key].length; ++a){
						io.to(connections[key][a]).emit("user-left", socket.id)
					}
					
					// removing the socketID
					var index = connections[key].indexOf(socket.id);
					connections[key].splice(index, 1);

					console.log(key, socket.id, Math.ceil(diffTime / 1000))

					if(connections[key].length === 0){
						delete connections[key]
					}
					break;
				}
			}
		}
	})
})


app.use(passport.initialize());

// API Routes
app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/groups', groupsRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
	res.json({ 
		status: 'OK', 
		message: 'Shubh Meet Backend Server is running',
		timestamp: new Date().toISOString()
	});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});
  
 // error handler
app.use(function(err, req, res, next) {
	// Check if headers have already been sent
	if (res.headersSent) {
		return next(err);
	}
	
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
  
	// render the error page
	res.status(err.status || 500);
	res.json({ error: err });
});

server.listen(app.get('port'), () => {
	console.log(`🚀 Shubh Meet Backend Server listening on port ${app.get('port')}`);
	console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
	console.log(`📡 Socket.IO enabled with CORS for frontend`);
}); 
