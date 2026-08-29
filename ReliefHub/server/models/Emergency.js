import mongoose from 'mongoose';

const emergencySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Contact person name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required for verification'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location or district is required'],
      trim: true,
    },
    disasterType: {
      type: String,
      required: [true, 'Disaster type is required'],
      enum: ['Flood', 'Cyclone', 'Fire', 'Earthquake', 'Landslide', 'Other'],
      default: 'Flood',
    },
    urgency: {
      type: String,
      required: [true, 'Urgency level is required'],
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'High',
    },
    assistanceRequired: {
      type: [String],
      default: [],
    },
    peopleAffected: {
      type: Number,
      default: 1,
      min: 1,
    },
    message: {
      type: String,
      required: [true, 'Please provide details of the emergency situation'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Responding', 'Resolved', 'Cancelled'],
      default: 'Pending',
    },
    assignedTeam: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Emergency = mongoose.model('Emergency', emergencySchema);
export default Emergency;
