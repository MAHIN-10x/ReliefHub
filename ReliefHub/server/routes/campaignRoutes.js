import express from 'express';
import Campaign from '../models/Campaign.js';

const router = express.Router();

// @route   GET /api/campaigns
// @desc    Get all active relief fundraising campaigns
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ status: 1, createdAt: -1 });
    const formatted = campaigns.map((c) => ({
      id: c._id,
      title: c.title,
      description: c.description,
      targetAmount: c.targetAmount,
      raisedAmount: c.raisedAmount,
      currency: c.currency || '৳',
      location: c.location,
      status: c.status,
      category: c.category,
      donorsCount: c.donorsCount,
      imageUrl: c.imageUrl,
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/campaigns/:id
// @desc    Get a single campaign by ID
router.get('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }
    res.json({ success: true, data: campaign });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/campaigns
// @desc    Create a new campaign
router.post('/', async (req, res) => {
  try {
    const campaign = await Campaign.create(req.body);
    res.status(201).json({ success: true, campaign });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
