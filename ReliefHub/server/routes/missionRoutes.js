import express from 'express';
import Mission from '../models/Mission.js';

const router = express.Router();

// @route   GET /api/missions
// @desc    Get all volunteer missions
router.get('/', async (req, res) => {
  try {
    const missions = await Mission.find().sort({ createdAt: -1 });
    // Transform _id to id to match frontend expectation
    const formatted = missions.map((m) => ({
      id: m._id,
      title: m.title,
      location: m.location,
      requiredVolunteers: m.requiredVolunteers,
      joinedVolunteers: m.joinedVolunteers,
      missionType: m.missionType,
      urgency: m.urgency,
      date: m.date,
      description: m.description,
      contactPerson: m.contactPerson,
      contactPhone: m.contactPhone,
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/missions/:id/join
// @desc    Register a volunteer for a mission
router.post('/:id/join', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const mission = await Mission.findById(req.params.id);

    if (!mission) {
      return res.status(404).json({ success: false, message: 'Mission not found' });
    }

    mission.joinedVolunteers += 1;
    if (name || email || phone) {
      mission.volunteersList.push({ name, email, phone });
    }
    await mission.save();

    res.json({
      success: true,
      message: 'You have registered for this mission! Our coordinator will contact you shortly.',
      mission,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/missions
// @desc    Create a new volunteer mission (for NGOs / Admin)
router.post('/', async (req, res) => {
  try {
    const mission = await Mission.create(req.body);
    res.status(201).json({ success: true, mission });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
