import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema(
  {
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign',
      required: false,
    },
    campaignTitle: {
      type: String,
      default: 'General Relief Fund',
    },
    donorName: {
      type: String,
      required: [true, 'Donor name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email address is required for receipt'],
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    amount: {
      type: Number,
      required: [true, 'Donation amount is required'],
      min: 10,
    },
    paymentMethod: {
      type: String,
      enum: ['bKash', 'Nagad', 'Rocket', 'Card', 'Bank Transfer'],
      default: 'bKash',
    },
    transactionId: {
      type: String,
      unique: true,
      required: true,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['Completed', 'Pending', 'Failed'],
      default: 'Completed',
    },
  },
  {
    timestamps: true,
  }
);

const Donation = mongoose.model('Donation', donationSchema);
export default Donation;
