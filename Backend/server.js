// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Your React app's URL (default Vite port)
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Schemas remain the same...
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

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});