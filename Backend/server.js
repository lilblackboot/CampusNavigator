// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { type } = require('os');

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Your React app's URL (default Vite port)
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Serve uploaded files statically
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// User Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^\d+@paruluniversity\.ac\.in$/.test(v);
      },
      message: props => `${props.value} is not a valid Parul University email address!`
    }
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// OTP Schema
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300
  }
});

const OTP = mongoose.model('OTP', otpSchema);

// Food Post Schema
const foodPostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  shop: {
    type: String,
    required: true
  },
  food: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  location: {
    lat: Number,
    lng: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const FoodPost = mongoose.model('FoodPost', foodPostSchema);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadPath = path.join(__dirname, 'uploads/food-images');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'food-' + uniqueSuffix + ext);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Middleware to verify user authentication
const authenticateUser = async (req, res, next) => {
  const { userId } = req.body;
  
  if (!userId) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ message: 'Server error during authentication' });
  }
};
// Function to send welcome email
const sendWelcomeEmail = async (email) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to Parul University Portal',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1a365d;">Welcome to Parul University!</h1>
        <p>Dear Student,</p>
        <p>Your account has been successfully created and verified. Welcome to the Parul University portal!</p>
        <div style="margin: 20px 0; padding: 15px; background-color: #f0f4f8; border-radius: 5px;">
          <p style="margin: 0;"><strong>Email:</strong> ${email}</p>
        </div>
        <p>You can now log in to your account using your email and password.</p>
        <p>Here are some things you can do:</p>
        <ul>
          <li>Access your student dashboard</li>
          <li>View your course materials</li>
          <li>Check your attendance</li>
          <li>Access university resources</li>
        </ul>
        <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
        <p style="margin-top: 20px;">Best regards,<br>Parul University Team</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully');
  } catch (error) {
    console.error('Error sending welcome email:', error);
    // We don't throw the error as this is a non-critical operation
  }
};

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP Route
app.post('/api/send-otp', async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const otp = generateOTP();

    await OTP.findOneAndUpdate(
      { email },
      { email, otp },
      { upsert: true, new: true }
    );

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verification OTP for Parul University Portal',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1a365d;">Email Verification</h1>
          <p>Your OTP for email verification is:</p>
          <div style="background-color: #f0f4f8; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
            <h2 style="margin: 0; color: #2d3748;">${otp}</h2>
          </div>
          <p>This OTP will expire in 5 minutes.</p>
          <p>If you didn't request this OTP, please ignore this email.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify OTP and Complete Signup Route
app.post('/api/verify-signup', async (req, res) => {
  try {
    const { email, password, otp } = req.body;

    // Verify OTP
    const otpRecord = await OTP.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword
    });

    await user.save();
    await OTP.deleteOne({ email }); // Delete used OTP

    // Send welcome email
    await sendWelcomeEmail(email);

    res.status(201).json({ message: 'Account created successfully. Welcome email sent!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Return user data with proper formatting
    res.json({
      message: 'Login successful',
      user: {
        email: user.email,
        id: user._id.toString()
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Slot Schema
const slotSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  slots: {
    monday: { type: Number, default: 0 },
    tuesday: { type: Number, default: 0 },
    wednesday: { type: Number, default: 0 },
    thursday: { type: Number, default: 0 },
    friday: { type: Number, default: 0 },
    saturday: { type: Number, default: 0 },
    sunday: { type: Number, default: 0 }
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const Slot = mongoose.model('Slot', slotSchema);

// Get user slots
app.get('/api/slots/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('Fetching slots for user ID:', userId); // Log the userId
    
    if (!userId || userId === 'undefined' || userId === 'null') {
      return res.status(400).json({ message: 'Invalid user ID provided' });
    }
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    
    const slotData = await Slot.findOne({ userId });
    
    if (!slotData) {
      console.log('Slot configuration not found for user ID:', userId); // Log missing slot configuration
      return res.status(404).json({ message: 'Slot configuration not found' });
    }
    
    res.json({ 
      slots: slotData.slots,
      lastUpdated: slotData.lastUpdated
    });
  } catch (error) {
    console.error('Error fetching slots:', error);
    res.status(500).json({ message: error.message });
  }
});
// Create or update slots
app.post('/api/slots', async (req, res) => {
  try {
    const { userId, slots } = req.body;
    
    if (!userId || !slots) {
      return res.status(400).json({ message: 'User ID and slots data are required' });
    }
    
    // Validate slots data
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    for (const day of days) {
      if (typeof slots[day] !== 'number' || slots[day] < 0 || slots[day] > 12) {
        return res.status(400).json({ 
          message: `Invalid slot count for ${day}. Must be a number between 0 and 12.` 
        });
      }
    }
    
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Create or update slots
    const updatedSlots = await Slot.findOneAndUpdate(
      { userId },
      { 
        userId,
        slots,
        lastUpdated: Date.now()
      },
      { upsert: true, new: true }
    );
    
    res.json({ 
      message: 'Slot configuration saved successfully',
      slots: updatedSlots.slots
    });
  } catch (error) {
    console.error('Error saving slots:', error);
    res.status(500).json({ message: error.message });
  }
});
app.get('/api/food-posts', async (req, res) => {
  try {
    const posts = await FoodPost.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching food posts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new food post with image upload
app.post('/api/food-posts', upload.single('image'), async (req, res) => {
  try {
    const { userId, region, shop, food, description, lat, lng } = req.body;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    // Validate user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }
    
    // Create relative URL for the uploaded image
    const imageUrl = `/uploads/food-images/${req.file.filename}`;
    
    // Create new food post
    const newFoodPost = new FoodPost({
      userId,
      userEmail: user.email,
      region,
      shop,
      food,
      description,
      imageUrl,
      location: {
        lat: lat || null,
        lng: lng || null
      }
    });
    
    const savedPost = await newFoodPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error creating food post:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific food post
app.get('/api/food-posts/:id', async (req, res) => {
  try {
    const post = await FoodPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Food post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Error fetching food post:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a food post
app.delete('/api/food-posts/:id', async (req, res) => {
  try {
    const { userId } = req.body;
    
    const post = await FoodPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Food post not found' });
    }
    
    // Check if user owns this post
    if (post.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized: You can only delete your own posts' });
    }
    
    // Delete the image file
    if (post.imageUrl) {
      const imagePath = path.join(__dirname, post.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    await FoodPost.findByIdAndDelete(req.params.id);
    res.json({ message: 'Food post deleted successfully' });
  } catch (error) {
    console.error('Error deleting food post:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Set up Multer for file uploads
const storage_events = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/uni-events/';

    // Ensure the folder exists
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload_events = multer({ 
  storage: storage_events,
  limits: { fileSize: 24 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

// Define Event Schema
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Create Event Model
const Event = mongoose.model('Event', eventSchema);

// Define Admin Schema
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

// Create Admin Model
const Admin = mongoose.model('Admin', adminSchema);

// Initialize default admin if not exists
const initializeAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ username: 'admin' });
    if (!adminExists) {
      // Using bcrypt for password hashing
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await Admin.create({
        username: 'admin',
        password: hashedPassword
      });
      console.log('Default admin created');
    }
  } catch (error) {
    console.error('Error initializing admin:', error);
  }
};

initializeAdmin();

// API Routes

// Get all events
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
});

// Get single event
app.get('/api/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error: error.message });
  }
});

// Create new event
app.post('/api/events', upload_events.single('image'), async (req, res) => {
  try {
    const eventData = {
      title: req.body.title,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      description: req.body.description
    };

    if (req.file) {
      eventData.imageUrl = `/uploads/uni-events/${req.file.filename}`;
    }

    const newEvent = new Event(eventData);
    await newEvent.save();
    
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: 'Error creating event', error: error.message });
  }
});

// Update event
app.put('/api/events/:id', upload_events.single('image'), async (req, res) => {
  try {
    const eventData = {
      title: req.body.title,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      description: req.body.description
    };

    if (req.file) {
      eventData.imageUrl = `/uploads/uni-events/${req.file.filename}`;
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      eventData,
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: 'Error updating event', error: error.message });
  }
});

// Delete event
app.delete('/api/events/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error: error.message });
  }
});

// Admin routes
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const admin = await Admin.findOne({ username });
    
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
});

app.post('/api/admin/change-credentials', async (req, res) => {
  try {
    const { currentUsername, currentPassword, newUsername, newPassword } = req.body;

    console.log('Received request to change credentials:', { currentUsername, newUsername });

    const admin = await Admin.findOne({ username: currentUsername });

    if (!admin) {
      console.log('Admin not found');
      return res.status(401).json({ message: 'Current credentials are invalid' });
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, admin.password);

    if (!isPasswordValid) {
      console.log('Invalid password');
      return res.status(401).json({ message: 'Current credentials are invalid' });
    }

    // Check if new username is already taken
    const existingAdmin = await Admin.findOne({ username: newUsername });
    if (existingAdmin) {
      console.log('New username already exists');
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await Admin.create({ username: newUsername, password: hashedPassword });
    
    console.log('New admin created:', newUsername);

    // Delete previous admin entry
    await Admin.deleteOne({ username: currentUsername });

    console.log('Old admin deleted:', currentUsername);

    res.json({ message: 'Credentials updated successfully' });
  } catch (error) {
    console.error('Error updating credentials:', error.message);
    res.status(500).json({ message: 'Error updating credentials', error: error.message });
  }
});


// Public endpoint to get published events
app.get('/api/public/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
});

// Define Teacher Schema
const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  remark: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

// Set up Multer for file uploads
const storage_teachers = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/teachers/';

    // Ensure the folder exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload_teachers = multer({ 
  storage: storage_teachers,
  limits: { fileSize: 24 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

// API Routes

// Get all teachers
app.get('/api/teachers', async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({ createdAt: -1 });
    res.status(200).json(teachers);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single teacher
app.get('/api/teachers/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json(teacher);
  } catch (error) {
    console.error('Error fetching teacher:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new teacher
app.post('/api/teachers', upload_teachers.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }
    
    const imageUrl = `/uploads/teachers/${req.file.filename}`;
    
    const newTeacher = new Teacher({
      name: req.body.name,
      subject: req.body.subject,
      remark: req.body.remark,
      imageUrl: imageUrl
    });
    
    const savedTeacher = await newTeacher.save();
    res.status(201).json(savedTeacher);
  } catch (error) {
    console.error('Error adding teacher:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a teacher
app.put('/api/teachers/:id', upload_teachers.single('image'), async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    
    // Update teacher fields
    teacher.name = req.body.name;
    teacher.subject = req.body.subject;
    teacher.remark = req.body.remark;
    
    // Update image if a new one is uploaded
    if (req.file) {
      teacher.imageUrl = `/uploads/teachers/${req.file.filename}`;
    }
    
    const updatedTeacher = await teacher.save();
    res.status(200).json(updatedTeacher);
  } catch (error) {
    console.error('Error updating teacher:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a teacher
app.delete('/api/teachers/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    
    await Teacher.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    console.error('Error deleting teacher:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search teachers
app.get('/api/teachers/search', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    const teachers = await Teacher.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { subject: { $regex: query, $options: 'i' } }
      ]
    });
    
    res.status(200).json(teachers);
  } catch (error) {
    console.error('Error searching teachers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});