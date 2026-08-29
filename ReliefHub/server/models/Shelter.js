import mongoose from 'mongoose';

const shelterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Shelter name is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Shelter location is required'],
      trim: true,
    },
    currentCapacity: {
      type: Number,
      required: true,
      default: 0,
    },
    maxCapacity: {
      type: Number,
      required: true,
      min: 1,
    },
    availableSpaces: {
      type: Number,
      default: function () {
        return Math.max(0, this.maxCapacity - this.currentCapacity);
      },
    },
    availableFood: {
      type: String,
      default: 'Available',
    },
    medicalSupport: {
      type: String,
      default: 'Basic First Aid Available',
    },
    contact: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Open', 'Available', 'Near Full', 'Full', 'Closed'],
      default: 'Open',
    },
    facilities: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save calculation of availableSpaces
shelterSchema.pre('save', function (next) {
  const max = Number(this.maxCapacity) || 0;
  const curr = Number(this.currentCapacity) || 0;
  this.availableSpaces = Math.max(0, max - curr);
  next();
});

const Shelter = mongoose.model('Shelter', shelterSchema);
export default Shelter;
