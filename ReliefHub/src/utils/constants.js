/**
 * ReliefHub Application Constants & Initial Mock Data
 * Structured to cleanly map to future Express + MongoDB API responses.
 */

// Statistics displayed on the Home Page
export const INITIAL_STATISTICS = [
  {
    id: 'stat-1',
    value: 'Stay calm',
    label: 'Safety Instruction',
    highlight: true,
  },
  {
    id: 'stat-2',
    value: 'Move to safety',
    label: 'Safety Instruction',
  },
  {
    id: 'stat-3',
    value: 'Follow alerts',
    label: 'Safety Instruction',
  },
  {
    id: 'stat-4',
    value: 'Help others',
    label: 'Safety Instruction',
  },
];

// "How ReliefHub Helps" Section Items
export const HOW_IT_HELPS = [
  {
    id: 'help-1',
    icon: '🚨',
    title: 'Report Emergency',
    description: 'Send a request with location, disaster type and required assistance.',
    link: '/emergency',
    badgeColor: '#fee2e2',
  },
  {
    id: 'help-2',
    icon: '🤝',
    title: 'Volunteer Missions',
    description: 'Find nearby missions and help with rescue, food and transport.',
    link: '/volunteers',
    badgeColor: '#fef3c7',
  },
  {
    id: 'help-3',
    icon: '🏠',
    title: 'Find Shelter',
    description: 'See nearby shelters and check capacity, food and medical supplies.',
    link: '/shelters',
    badgeColor: '#e0f2fe',
  },
  {
    id: 'help-4',
    icon: '💰',
    title: 'Donate & Track',
    description: 'Support verified campaigns and track how funds are distributed.',
    link: '/donate',
    badgeColor: '#dcfce7',
  },
];

// Featured Campaign for Home Page
export const FEATURED_CAMPAIGN = {
  id: 'camp-1',
  title: 'Bangladesh Flood Relief 2026',
  description: 'Emergency food, clean water and medicine for flood-affected families.',
  targetAmount: 500000,
  raisedAmount: 327500,
  currency: '৳',
  location: 'Sylhet & Sunamganj Districts',
  status: 'Urgent',
  category: 'Flood',
  donorsCount: 1420,
};

// All Active Relief Campaigns (for /campaigns and /donate)
export const ALL_CAMPAIGNS = [
  {
    id: 'camp-1',
    title: 'Bangladesh Flood Relief 2026',
    description: 'Emergency food, clean water and medicine for flood-affected families.',
    targetAmount: 500000,
    raisedAmount: 327500,
    currency: '৳',
    location: 'Sylhet & Sunamganj Districts',
    status: 'Active',
    category: 'Flood',
    donorsCount: 1420,
  },
  {
    id: 'camp-2',
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
    id: 'camp-3',
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
    id: 'camp-4',
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

// Volunteer Missions Data
export const VOLUNTEER_MISSIONS = [
  {
    id: 'mis-1',
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
    id: 'mis-2',
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
    id: 'mis-3',
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
    id: 'mis-4',
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

// Shelters Data
export const ACTIVE_SHELTERS = [
  {
    id: 'sh-1',
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
    id: 'sh-2',
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
    id: 'sh-3',
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
    id: 'sh-4',
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
  {
    id: '6a9172abe2abe050cdb24369',
    name: 'Sylhet Polytechnic Institute Cyclone Center',
    location: 'Ambarkhana Road, Sylhet Sadar',
    currentCapacity: 420,
    maxCapacity: 500,
    availableSpaces: 80,
    availableFood: 'Adequate Supplies',
    medicalSupport: 'Basic First Aid Available',
    contact: '+880 1812-456789',
    status: 'Available',
    facilities: ['Drinking Water', 'Solar Lights', 'Emergency Toilets'],
  },
];

// User Registration Role Options
export const USER_ROLES = [
  { value: '', label: 'Select your role', disabled: true },
  { value: 'Victim', label: 'Victim / Person in Need' },
  { value: 'Volunteer', label: 'Volunteer' },
  { value: 'NGO', label: 'NGO / Humanitarian Org' },
  { value: 'Emergency Agency', label: 'Emergency Agency / First Responder' },
  { value: 'Donor', label: 'Donor / Contributor' },
];

// Disaster Types
export const DISASTER_TYPES = [
  'Flood',
  'Cyclone',
  'Fire',
  'Earthquake',
  'Landslide',
  'Other',
];

// Urgency Levels
export const URGENCY_LEVELS = [
  'Low',
  'Medium',
  'High',
  'Critical',
];

// Required Assistance Checkbox/Select Options
export const ASSISTANCE_TYPES = [
  'Food',
  'Water',
  'Medicine',
  'Rescue',
  'Shelter',
  'Transportation',
  'Other',
];

// Preset Donation Amounts (in BDT ৳)
export const DONATION_PRESETS = [500, 1000, 2000, 5000];
