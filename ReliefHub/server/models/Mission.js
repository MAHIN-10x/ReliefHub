import mongoose from 'mongoose';

const missionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Mission title is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    requiredVolunteers: {
      type: Number,
      required: true,
      min: 1,
    },
    joinedVolunteers: {
      type: Number,
      default: 0,
      min: 0,
    },
    missionType: {
      type: String,
      required: true,
      trim: true,
    },
    urgency: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'High',
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    contactPerson: {
      type: String,
      required: true,
      trim: true,
    },
    contactPhone: {
      type: String,
      required: true,
      trim: true,
    },
    volunteersList: [
      {
        name: String,
        email: String,
        phone: String,
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Mission = mongoose.model('Mission', missionSchema);
export default Mission;
