import express from 'express';
import Emergency from '../models/Emergency.js';
import Mission from '../models/Mission.js';

const router = express.Router();

// @route   GET /api/emergencies
// @desc    Get all emergency reports
router.get('/', async (req, res) => {
  try {
    const { status, disasterType } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (disasterType) filter.disasterType = disasterType;

    const emergencies = await Emergency.find(filter).sort({ createdAt: -1 });
    const count = await Emergency.countDocuments({ status: { $ne: 'Resolved' } });

    res.json({
      success: true,
      activeCount: count,
      count: emergencies.length,
      data: emergencies,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/emergencies
// @desc    Create a new emergency distress report AND auto-create a Volunteer Mission
router.post('/', async (req, res) => {
  try {
    const name = (req.body.fullName || req.body.name || '').trim();
    const phone = (req.body.phone || '').trim();
    const location = (req.body.location || '').trim();
    const disasterType = req.body.disasterType || 'Flood';
    const urgency = req.body.urgencyLevel || req.body.urgency || 'High';
    const assistanceRequired = Array.isArray(req.body.requiredAssistance)
      ? req.body.requiredAssistance
      : Array.isArray(req.body.assistanceRequired)
        ? req.body.assistanceRequired
        : [];
    const peopleAffected = Number(req.body.numberOfPeople || req.body.peopleAffected) || 1;
    const message = (
      req.body.additionalDetails ||
      req.body.message ||
      `Urgent ${disasterType} assistance requested in ${location}.`
    ).trim();

    if (!name || !phone || !location) {
      return res.status(400).json({
        success: false,
        message: 'Full name, phone, and location are required for emergency dispatch.',
      });
    }

    // 1. Save Emergency document into MongoDB
    const emergency = await Emergency.create({
      name,
      phone,
      location,
      disasterType,
      urgency: ['Low', 'Medium', 'High', 'Critical'].includes(urgency) ? urgency : 'High',
      assistanceRequired,
      peopleAffected,
      message,
      status: 'Pending',
    });

    // 2. Determine Mission Type based on requested assistance & disaster type
    let missionType = 'Rescue & Food Aid';
    if (assistanceRequired.some((a) => a.toLowerCase().includes('med'))) {
      missionType = 'Medical Assistance';
    } else if (assistanceRequired.some((a) => a.toLowerCase().includes('shelter'))) {
      missionType = 'Shelter Management';
    } else if (assistanceRequired.some((a) => a.toLowerCase().includes('rescue') || a.toLowerCase().includes('food') || a.toLowerCase().includes('water'))) {
      missionType = 'Rescue & Food Aid';
    } else if (disasterType === 'Cyclone' || disasterType === 'Flood') {
      missionType = 'Rescue & Food Aid';
    } else if (disasterType === 'Fire' || disasterType === 'Landslide') {
      missionType = 'Disaster Prevention';
    }

    // 3. Calculate recommended volunteer count based on affected people
    const requiredVolunteers = Math.max(5, Math.min(50, Math.ceil(peopleAffected * 2)));
    const assistSummary = assistanceRequired.length > 0 ? assistanceRequired.join(', ') : 'Immediate Rescue & Relief';
    const missionTitle = `[Rapid Response] ${disasterType} Emergency Aid in ${location}`;

    // 4. Automatically create Volunteer Mission in MongoDB
    const mission = await Mission.create({
      title: missionTitle,
      location: location,
      requiredVolunteers,
      joinedVolunteers: 0,
      missionType,
      urgency: ['Low', 'Medium', 'High', 'Critical'].includes(urgency) ? urgency : 'High',
      date: 'Immediate Dispatch (Active Emergency)',
      description: `${message} — Requested: ${assistSummary}. People affected: ${peopleAffected}. Direct on-site contact: ${name} (${phone}).`,
      contactPerson: `${name} (Emergency Reporter)`,
      contactPhone: phone,
    });

    res.status(201).json({
      success: true,
      id: emergency._id,
      emergency,
      mission,
      message: 'Emergency request submitted and added to volunteer missions board successfully.',
    });
  } catch (error) {
    console.error('Emergency submission error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PATCH /api/emergencies/:id/status
// @desc    Update status of an emergency (e.g. Responding, Resolved)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status, assignedTeam } = req.body;
    const emergency = await Emergency.findById(req.params.id);

    if (!emergency) {
      return res.status(404).json({ success: false, message: 'Emergency report not found' });
    }

    if (status) emergency.status = status;
    if (assignedTeam) emergency.assignedTeam = assignedTeam;

    await emergency.save();

    res.json({
      success: true,
      message: `Emergency status updated to ${emergency.status}`,
      data: emergency,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
