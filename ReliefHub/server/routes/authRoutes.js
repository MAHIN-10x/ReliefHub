import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'reliefhub_secret_key_2026', {
    expiresIn: '30d',
  });
};

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, role, phone, organization, location } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      role: role || 'Volunteer',
      phone: phone || '',
      organization: organization || '',
      location: location || '',
    });

    res.status(201).json({
      success: true,
      message: 'Account registered successfully!',
      user: {
        id: user._id,
        name: user.fullName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        organization: user.organization,
        location: user.location,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    res.json({
      success: true,
      message: 'Signed in successfully!',
      user: {
        id: user._id,
        name: user.fullName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        organization: user.organization,
        location: user.location,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/auth/users
// @desc    Get user list summary (for statistics)
router.get('/users', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const volunteerCount = await User.countDocuments({ role: 'Volunteer' });
    const ngoCount = await User.countDocuments({ role: 'NGO' });
    res.json({ success: true, totalUsers, volunteerCount, ngoCount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
