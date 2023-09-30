const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  communityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community',
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rideName: {
    type: String,
    required: false,
  },
  distance: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  route: {
    type: String,
    required: true,
  },
  isBooked: {
    type: Boolean,
    required: false,
    default: false,
  },
  requestedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  acceptedUser: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ,
  // You can add more fields relevant to a ride here
});

const Ride = mongoose.models.Ride || mongoose.model('Ride', rideSchema);

module.exports = Ride;
