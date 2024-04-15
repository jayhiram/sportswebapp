const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
const pool = require('./db');
const bodyParser = require('body-parser');
const path = require('path');
const moment = require('moment');

const PORT = process.env.PORT || 3009;

const app = express();
const server = http.createServer(app); // Create HTTP server

const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:3000' // Replace with the client's origin (domain and port)
}));

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static('uploads'));


// Middleware to handle CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


// Define a global variable to store messages for each room
const roomMessages = {};

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinRoom', ({ username, room }) => {
    console.log(`${username} joined room ${room}`);
    socket.join(room);
    
    socket.username = username; // Assign username to socket
    io.to(socket.id).emit('userAction', { username: 'Server', text: `Welcome to ${room}. Connect with others!`, time: new Date().toLocaleTimeString() });
    socket.to(room).emit('userAction', { username: 'Server', text: `${username} joined the chatroom`, time: new Date().toLocaleTimeString() });
    io.to(room).emit('roomUsers', { room, users: getUsersInRoom(room) });

    // Retrieve and send previous messages for the room
    if (roomMessages[room]) {
      socket.emit('previousMessages', roomMessages[room]);
    }
  });

  socket.on('chatMessage', (msg) => {
    console.log('Message:', msg);
    io.to(msg.room).emit('message', formatMessage(msg)); // Broadcast message to all clients

    // Store the message in roomMessages
    if (!roomMessages[msg.room]) {
      roomMessages[msg.room] = [];
    }
    roomMessages[msg.room].push(msg);
  });


  socket.on('notification', (data) => {
    console.log('Received notification:', data);
    io.emit('notification', data); // Broadcast the notification to all connected clients
  });




  // Inside the 'disconnect' event handler
  socket.on('disconnect', () => {
    if (socket.username) {
      console.log(`${socket.username} disconnected`);
      const room = Object.keys(socket.rooms)[1]; // Assuming the room is the second key in the rooms object
      io.to(room).emit('userAction', { username: 'Server', text: `${socket.username} left the chatroom`, time: new Date().toLocaleTimeString() });
      io.to(room).emit('roomUsers', { room, users: getUsersInRoom(room) });
    }
  });
});

function formatMessage(text) {
  return text;
}

function getUsersInRoom(room) {
  const usersInRoom = io.sockets.adapter.rooms.get(room);
  if (usersInRoom) {
    return Array.from(usersInRoom).map(socketId => io.sockets.sockets.get(socketId).username);
  } else {
    return [];
  }
}





// API endpoint to get user names
app.get('/api/users', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT fullName FROM users');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});







// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Retrieve the user record from the database using the email
    const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    // If no user found with the provided email
    if (!user.length) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the hashed password with the password provided during login
    const isPasswordValid = await bcrypt.compare(password, user[0].password);

    // If passwords match, login is successful
    if (isPasswordValid) {
      // Attach user role to the request object
      req.user = { id: user[0].id, email: user[0].email, role: user[0].role };
      return res.status(200).json({ message: 'Login successful', role: user[0].role });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Login failed' });
  }
});

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // Validate signup data
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user with the same email already exists
    const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    await pool.query('INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)', [fullName, email, hashedPassword]);

    // Return success response
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});








// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder for storing uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Serve the uploaded files as static assets
app.use('/uploads', express.static('uploads'));






app.get('/api/posts', async (req, res) => {
  try {
    const [posts] = await pool.query(
      'SELECT id, file_path, caption, created_at, likes FROM posts ORDER BY created_at DESC'
    );

    const postsWithUrl = posts.map(post => ({
      ...post,
      url: `${req.protocol}://${req.get('host')}/uploads/${post.file_path}`,
      type: post.file_path.endsWith('.mp4') ? 'video' : 'image',
    }));

    res.status(200).json(postsWithUrl);
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// API endpoint to upload a post
app.post('/api/posts', upload.single('file'), async (req, res) => {
  try {
    const { caption } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Replace 'userId' with the actual user ID from the authenticated user
    const userId = 1; // Example user ID

    const query = 'INSERT INTO posts (user_id, file_path, caption, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)';
    const [result] = await pool.query(query, [userId, file.filename, caption]);

    const newPost = {
      id: result.insertId,
      userId,
      url: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`,
      caption: caption,
      type: file.mimetype.startsWith('image') ? 'image' : 'video',
      likes: 0,
      createdAt: new Date().toISOString(),
    };

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error uploading post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




// API endpoint to handle liking a post
app.put('/api/posts/:id/like', async (req, res) => {
  const postId = req.params.id;

  try {
    // Update the 'likes' count for the post in the database
    await pool.query('UPDATE posts SET likes = likes + 1 WHERE id = ?', [postId]);
    res.status(200).json({ message: 'Post liked' });
  } catch (error) {
    console.error('Error updating like:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// API endpoint to save notification in the database
app.post('/api/notifications', async (req, res) => {
  const { message, timestamp } = req.body;
  try {
    // Replace 'userId' with the actual user ID from the authenticated user
    const userId = 1; // Example user ID
    await pool.query('INSERT INTO user_notifications (user_id, message, timestamp) VALUES (?, ?, ?)', 
    [userId, message, timestamp]);
    res.status(201).json({ message: 'Notification saved successfully' });
  } catch (error) {
    console.error('Error saving notification:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// API endpoint to fetch unread notifications for the current user
app.get('/api/notifications', async (req, res) => {
  try {
    // Replace 'userId' with the actual user ID from the authenticated user
    const userId = 1; // Example user ID
    const [notifications] = await pool.query(
      'SELECT * FROM user_notifications WHERE user_id = ? AND is_read = 0',
      [userId]
    );
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to mark all notifications as read for the current user
app.put('/api/notifications/read', async (req, res) => {
  try {
    // Replace 'userId' with the actual user ID from the authenticated user
    const userId = 1; // Example user ID
    await pool.query('UPDATE user_notifications SET is_read = 1 WHERE user_id = ?', [userId]);
    res.json({ message: 'Notifications marked as read' });
  } catch (error) {
    console.error('Error marking notifications as read:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});













// API endpoint to handle event registration
app.post('/api/events/:id/register', async (req, res) => {
  const eventId = req.params.id;
  const { name, email, phoneNumber } = req.body;

  if (!name || !email || !phoneNumber) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Fetch event details based on eventId
    const [eventDetails] = await pool.query('SELECT name, date, sport FROM events WHERE id = ?', [eventId]);
    const eventName = eventDetails[0].name;
    const eventDate = eventDetails[0].date;
    const eventSport = eventDetails[0].sport;

    // Insert registration details into the database
    await pool.query('INSERT INTO event_registrations (event_id, name, email, phone_number, event_name, event_date, event_sport) VALUES (?, ?, ?, ?, ?, ?, ?)', 
    [eventId, name, email, phoneNumber, eventName, eventDate, eventSport]);
    

    // Insert a new notification for the registered user
    const userId = 1; // Replace with the actual user ID
    await pool.query('INSERT INTO user_notifications (user_id, message, timestamp) VALUES (?, ?, CURRENT_TIMESTAMP)', 
    [userId, `${name} has registered for the event.`]);
    



     // Emit 'newRegistration' event
     io.emit('newRegistration', { message: `${name} has registered for the event.`, timestamp: new Date().toISOString() });
    
    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error registering for event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Routes to handle event creation
app.get('/api/events', async (req, res) => { // Use async function
  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query('SELECT * FROM events');
    connection.release();
    res.json(results);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.post('/api/events', async (req, res) => { // Use async function
  const { name, date, time, location, sport } = req.body;

  //const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
  //io.emit('newRegistration', { message: `${name} has registered for the event.`, timestamp });
  //res.json({ success: true });


  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO events (name, date, time, location, sport) VALUES (?, ?, ?, ?, ?)',
      [name, date, time, location, sport]
    );




    connection.release();
    const newEvent = { id: result.insertId, name, date, time, location, sport };
    res.status(201).json(newEvent);
    // Inside the POST '/api/events' endpoint after successfully creating an event
    io.emit('newEventCreated', { message: 'Check your upcoming events, we have added a new event' });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});






server.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 