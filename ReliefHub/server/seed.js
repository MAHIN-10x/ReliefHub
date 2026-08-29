import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import dns from 'dns';

// Fix for Windows DNS ECONNREFUSED on MongoDB Atlas SRV records
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

import Campaign from './models/Campaign.js';
import Shelter from './models/Shelter.js';
import Mission from './models/Mission.js';
import Emergency from './models/Emergency.js';
import User from './models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from server directory first, fallback to root
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config();

const sampleCampaigns = [
  {
    title: 'Bangladesh Flood Relief 2026',
    description: 'Emergency food, clean water and medicine for flood-affected families.',
    targetAmount: 500000,
    raisedAmount: 327500,
    currency: '৳',
    location: 'Sylhel & Sunamganj Districts',
    status: 'Urgent',
    category: 'Flood',
    donorsCount: 1420,
  },
  {
    title: 'Coastal Cyclone Remal Recovery',
    description: 'Rebuilding damaged homes, providing dry rations and medical aid in coastal belt.',
    targetAmount: 850000,
    raisedAmount: 610000,
    currency: '৳',
    location: 'Khulna & Barisal',
    status: 'Active',
    category: 'Cyclone',
    donorsCount: 2310,
  },
  {
    title: 'Chittagong Hill Tracts Landslide Aid',
    description: 'Emergency rescue support and temporary shelter materials for displaced families.',
    targetAmount: 300000,
    raisedAmount: 185000,
    currency: '৳',
    location: 'Rangamati & Bandarban',
    status: 'Active',
    category: 'Landslide',
    donorsCount: 890,
  },
  {
    title: 'Urban Fire Emergency Support',
    description: 'Burn treatment medical supply packages and rehabilitation for slum fire victims.',
    targetAmount: 400000,
    raisedAmount: 350000,
    currency: '৳',
    location: 'Dhaka North',
    status: 'Near Goal',
    category: 'Fire',
    donorsCount: 1740,
  },
];

const sampleShelters = [
  {
    name: 'Sylhet Model High School Shelter',
    location: 'Amberkhana, Sylhet',
    currentCapacity: 340,
    maxCapacity: 450,
    availableSpaces: 110,
    availableFood: 'Available (3 Days Stock)',
    medicalSupport: 'On-site Paramedic Team',
    contact: '+880 1812-345678',
    status: 'Open',
    facilities: ['Safe Water', 'Electricity/Generator', 'Separate Women Ward'],
  },
  {
    name: 'Sunamganj Govt College Cyclone Center',
    location: 'College Road, Sunamganj Sadar',
    currentCapacity: 580,
    maxCapacity: 600,
    availableSpaces: 20,
    availableFood: 'Limited Supplies',
    medicalSupport: 'Basic First Aid Only',
    contact: '+880 1714-987654',
    status: 'Near Full',
    facilities: ['Drinking Water', 'Solar Lights'],
  },
  {
    name: 'Bhola Coastal Community Center',
    location: 'Char Fasson, Bhola',
    currentCapacity: 190,
    maxCapacity: 350,
    availableSpaces: 160,
    availableFood: 'Full Rations Available',
    medicalSupport: 'Doctor Available 10am-6pm',
    contact: '+880 1913-445566',
    status: 'Open',
    facilities: ['Water Tank', 'Sanitary Kits', 'Baby Care Area'],
  },
  {
    name: 'Kurigram Flood Shelter Hub',
    location: 'Ulipur Upazila, Kurigram',
    currentCapacity: 410,
    maxCapacity: 500,
    availableSpaces: 90,
    availableFood: 'Available (2 Days Stock)',
    medicalSupport: 'Mobile Health Unit',
    contact: '+880 1618-223311',
    status: 'Open',
    facilities: ['Purified Water Plant', 'Security Volunteers'],
  },
];

const sampleMissions = [
  {
    title: 'Emergency Boat Rescue & Food Packet Distribution',
    location: 'Companyganj, Sylhet',
    requiredVolunteers: 25,
    joinedVolunteers: 18,
    missionType: 'Rescue & Food Aid',
    urgency: 'Critical',
    date: 'Immediate - Ongoing',
    description: 'Operate rescue boats to evacuate stranded families and distribute high-energy food biscuits and clean drinking water.',
    contactPerson: 'Rafiqul Islam (Coordinator)',
    contactPhone: '+880 1711-223344',
  },
  {
    title: 'Medical Camp & Water Purification Tablet Setup',
    location: 'Sunamganj Sadar',
    requiredVolunteers: 15,
    joinedVolunteers: 11,
    missionType: 'Medical Assistance',
    urgency: 'High',
    date: 'Tomorrow, 8:00 AM',
    description: 'Assist volunteer doctors in treating waterborne diseases, distributing saline and essential emergency antibiotics.',
    contactPerson: 'Dr. Nusrat Jahan',
    contactPhone: '+880 1819-334455',
  },
  {
    title: 'Shelter Cleanliness & Logistics Coordination',
    location: 'Doulatkhan, Bhola',
    requiredVolunteers: 30,
    joinedVolunteers: 24,
    missionType: 'Shelter Management',
    urgency: 'Medium',
    date: 'This Weekend',
    description: 'Manage registration of incoming families, sort donated dry clothes and ensure hygiene supplies are distributed.',
    contactPerson: 'Tanvir Ahmed',
    contactPhone: '+880 1912-556677',
  },
  {
    title: 'Temporary Levee & Sandbag Reinforcement',
    location: 'Kurigram District',
    requiredVolunteers: 40,
    joinedVolunteers: 32,
    missionType: 'Disaster Prevention',
    urgency: 'High',
    date: 'Immediate',
    description: 'Work with local emergency agencies to place sandbags along vulnerable riverbanks to prevent further flooding.',
    contactPerson: 'Mahmudul Hasan',
    contactPhone: '+880 1611-998877',
  },
];

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.error('❌ MONGO_URI is missing in .env');
      process.exit(1);
    }

    console.log('⏳ Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri);
    console.log('🌱 Connected to MongoDB Atlas successfully!');

    // Clear existing data
    await Campaign.deleteMany({});
    await Shelter.deleteMany({});
    await Mission.deleteMany({});
    console.log('🧹 Cleaned existing records.');

    // Insert seeds
    await Campaign.insertMany(sampleCampaigns);
    await Shelter.insertMany(sampleShelters);
    await Mission.insertMany(sampleMissions);

    console.log('✅ Successfully seeded MongoDB with initial ReliefHub data!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedData();
