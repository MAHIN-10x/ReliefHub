import express from 'express';
import Shelter from '../models/Shelter.js';

const router = express.Router();

// @route   GET /api/shelters
// @desc    Get all active shelters
router.get('/', async (req, res) => {
  try {
    const shelters = await Shelter.find().sort({ createdAt: -1 });
    const formatted = shelters.map((s) => {
      const maxCap = Number(s.maxCapacity) || 1;
      const currCap = Number(s.currentCapacity) || 0;
      const avail = typeof s.availableSpaces === 'number' 
        ? s.availableSpaces 
        : Math.max(0, maxCap - currCap);

      return {
        id: s._id.toString(),
        _id: s._id.toString(),
        name: s.name || 'Emergency Shelter',
        location: s.location || 'Location Not Specified',
        currentCapacity: currCap,
        maxCapacity: maxCap,
        availableSpaces: avail,
        availableFood: s.availableFood || 'Available',
        medicalSupport: s.medicalSupport || 'Basic First Aid Available',
        contact: s.contact || 'N/A',
        status: s.status || 'Open',
        facilities: Array.isArray(s.facilities) ? s.facilities : [],
        createdAt: s.createdAt,
      };
    });

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/shelters
// @desc    Create a new shelter
router.post('/', async (req, res) => {
  try {
    const shelter = await Shelter.create(req.body);
    res.status(201).json({ success: true, shelter });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PATCH /api/shelters/:id/capacity
// @desc    Update shelter capacity numbers
router.patch('/:id/capacity', async (req, res) => {
  try {
    const { currentCapacity } = req.body;
    const shelter = await Shelter.findById(req.params.id);
    if (!shelter) {
      return res.status(404).json({ success: false, message: 'Shelter not found' });
    }

    shelter.currentCapacity = currentCapacity;
    shelter.availableSpaces = Math.max(0, shelter.maxCapacity - currentCapacity);
    if (shelter.availableSpaces === 0) {
      shelter.status = 'Full';
    } else if (shelter.availableSpaces < shelter.maxCapacity * 0.15) {
      shelter.status = 'Near Full';
    } else {
      shelter.status = 'Open';
    }
    await shelter.save();

    res.json({ success: true, shelter });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
