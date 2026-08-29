import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Campaign title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Campaign description is required'],
      trim: true,
    },
    targetAmount: {
      type: Number,
      required: [true, 'Target funding amount is required'],
      min: 0,
    },
    raisedAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    currency: {
      type: String,
      default: '৳',
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Urgent', 'Near Goal', 'Completed'],
      default: 'Active',
    },
    category: {
      type: String,
      enum: ['Flood', 'Cyclone', 'Landslide', 'Fire', 'Medical', 'General'],
      default: 'Flood',
    },
    donorsCount: {
      type: Number,
      default: 0,
    },
    imageUrl: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Campaign = mongoose.model('Campaign', campaignSchema);
export default Campaign;
