const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
      dateOfBirth: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
      },
      type: {
        type: String,
        required: function () {
          return this.step === "preferences";
        }, // Only required in the "preferences" step
      },
      location: {
        type: String,
        required: function () {
          return this.step === "location";
        }, // Only required in the "location" step
      },
      datingPreferences: [
        {
          type: String,
        },
      ],
      lookingFor: {
        type: String,
        required: function () {
          return this.step === "preferences";
        }, // Only required in the "preferences" step
      },
      imageUrls: [
        {
          type: String,
        },
      ],
      prompts: [
        {
          question: {
            type: String,
            required: true,
          },
          answer: {
            type: String,
            required: true,
          },
        },
      ],
      likedProfiles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      receivedLikes: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          image: {
            type: String,
            required: true,
          },
          comment: {
            type: String,
          },
        },
      ],
      matches: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      blockedUsers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      step: {
        type: String,
        enum: ["basic-info", "preferences", "location", "details"],
        required: true,
      }, // Tracks the current step
});

const User = mongoose.model('User', userSchema);

module.exports = User;