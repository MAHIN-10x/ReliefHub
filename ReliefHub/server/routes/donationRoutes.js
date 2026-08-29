import express from 'express';
import Donation from '../models/Donation.js';
import Campaign from '../models/Campaign.js';

const router = express.Router();

// @route   POST /api/donations
// @desc    Process/record a donation & update campaign stats
router.post('/', async (req, res) => {
  try {
    const {
      campaignId,
      campaignTitle,
      donorName,
      email,
      phone,
      amount,
      paymentMethod,
      isAnonymous,
    } = req.body;

    if (!donorName || !email || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Donor name, email, and amount are required.',
      });
    }

    const transactionId = 'TXN_' + Math.random().toString(36).substring(2, 9).toUpperCase();

    const donation = await Donation.create({
      campaignId: campaignId && campaignId.length === 24 ? campaignId : undefined,
      campaignTitle: campaignTitle || 'General Relief Fund',
      donorName: isAnonymous ? 'Anonymous Donor' : donorName,
      email,
      phone: phone || '',
      amount: Number(amount),
      paymentMethod: paymentMethod || 'bKash',
      transactionId,
      isAnonymous: Boolean(isAnonymous),
      status: 'Completed',
    });

    // If donation belongs to a registered campaign, update raised amount and donor count
    if (campaignId && campaignId.length === 24) {
      await Campaign.findByIdAndUpdate(campaignId, {
        $inc: { raisedAmount: Number(amount), donorsCount: 1 },
      });
    }

    res.status(201).json({
      success: true,
      transactionId,
      donation,
      message: 'Thank you for your generous contribution to ReliefHub!',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/donations/stats
// @desc    Get total donation stats across the platform
router.get('/stats', async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 }).limit(10);
    const totalAgg = await Donation.aggregate([
      { $group: { _id: null, totalRaised: { $sum: '$amount' }, totalCount: { $sum: 1 } } },
    ]);

    const totalRaised = totalAgg[0]?.totalRaised || 0;
    const totalCount = totalAgg[0]?.totalCount || 0;

    res.json({
      success: true,
      totalRaised,
      totalCount,
      recentDonations: donations,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
