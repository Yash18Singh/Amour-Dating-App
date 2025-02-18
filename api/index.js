require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const axios = require('axios')
const router = express.Router();


const User = require('./models/User'); // Assuming the User model is correctly defined
const Chat = require('./models/Message');

const app = express();
const port = process.env.PORT || 6000;

const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Middleware
const corsOptions = {
    origin: 'http://192.168.1.5:8081',  // Replace with your frontend's URL/IP
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Cannot connect to MongoDB:", err.message);
    });

// Start Server
http.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


// Register User Endpoint
app.post("/register", async (req, res) => {
    try {
      const userData = req.body;
  
      // Step validation (step field is required)
      if (!userData.step) {
        return res.status(400).json({ error: "The 'step' field is required" });
      }
  
      let user;
  
      // If it's the first step (creating a new user)
      if (userData.step === 'basic-info') {
        const { firstName, lastName, email, password, dateOfBirth, gender, age } = userData;
  
        if (!firstName || !email || !password || !dateOfBirth || !gender || !age) {
          return res.status(400).json({ error: "Missing required fields in basic info" });
        }
  
        user = new User({
          firstName,
          lastName,
          email,
          password,
          dateOfBirth,
          gender,
          age,
          step: 'basic-info'
        });
  
        await user.save();
        return res.status(200).json({ userId: user._id });
      }
  
      // For updating existing user
      if (userData.userId) {
        user = await User.findOne({ _id: userData.userId });
  
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
  
        switch (userData.step) {
          case 'preferences':
            user.datingPreferences = userData.datingPreferences;
            user.type = userData.type;
            user.lookingFor = userData.lookingFor;
            break;
          case 'location':
            user.location = userData.location;
            user.coordinates = userData.coordinates;
            break;
          case 'details':
            user.prompts = userData.prompts;
            user.imageUrls = userData.imageUrls;
            break;
          default:
            return res.status(400).json({ error: "Invalid step value" });
        }
  
        await user.save();
        
        const secretKey = crypto.randomBytes(32).toString('hex');
        const token = jwt.sign({userId: user._id}, secretKey);

        return res.status(200).json({ message: "User data updated successfully", userId: user._id, token: token});
      } else {
        return res.status(400).json({ error: "User ID is required to update the user" });
      }
  
    } catch (error) {
      console.error("ERROR REGISTERING USER:", error.message);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
});
  

//fetch the user's data
app.get('/users/:userId', async (req, res) => {
  try {
    const {userId} = req.params;
    const user = await User.findById(userId);

    if(!user){
        return res.status(500).json({message:"User not found"});
    }

    return res.status(200).json({user});

  } catch (error) {
    res.status(500).json({message:"Error fetching the user details", error}); 
  }
});


//login the user
app.post("/login", async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(!user){
      return res.status(401).json({message:"Invalid Email"});
    }

    if(user.password !== password){
      return res.status(401).json({message:"Invalid Password"});
    }

    const secretKey = crypto.randomBytes(32).toString('hex');
    const token = jwt.sign({userId: user._id}, secretKey);

    return res.status(200).json({token});

  } catch (error) {
    res.status(500).json({message:"Error logging in the user", error}); 
  }
});


//matches
app.get("/profiles", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create gender-based filter
    let filter = {};
    if (user.gender === "Man") {
      filter.gender = "Woman";  // Male user sees female profiles
    } else if (user.gender === "Woman") {
      filter.gender = "Man";  // Female user sees male profiles
    }

    // Apply additional filters based on user type (if any)
    if (user.type) {
      filter.type = user.type;
    }

    // Fetch current user data to check already matched or liked profiles
    const currentUser = await User.findById(userId)
      .populate("matches", "_id")
      .populate("likedProfiles", "_id");

    const friendsIds = currentUser.matches.map(friend => friend._id.toString());
    const crushIds = currentUser.likedProfiles.map(crush => crush._id.toString());

    // Exclude userId, friends, and crushes from the list of potential profiles
    filter._id = { $nin: [userId, ...friendsIds, ...crushIds] };

    // Fetch potential matches based on the updated filter
    const profiles = await User.find(filter);

    return res.status(200).json(profiles);
  } catch (error) {
    console.error("Error fetching profiles in backend:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



//endpoint for liking a profile
app.post('/like-profile', async (req, res) => {
  try {
    const { userId, likedUserId, image, comment } = req.body;

    // Validate the request body
    if (!userId || !likedUserId || !image || !comment) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Perform the updates concurrently
    const updateLikedUser = User.findByIdAndUpdate(
      likedUserId,
      {
        $push: {
          receivedLikes: {
            userId: userId,
            image: image,
            comment: comment,
          },
        },
      },
      { new: true } // Return the updated document (optional)
    );

    const updateUser = User.findByIdAndUpdate(
      userId,
      {
        $push: {
          likedProfiles: likedUserId,
        },
      },
      { new: true } // Return the updated document (optional)
    );

    // Wait for both updates to complete
    await Promise.all([updateLikedUser, updateUser]);

    res.status(200).json({ message: "Profile liked successfully" });
  } catch (error) {
    console.error("Error liking the profile in backend:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});





//receiving likes
app.get('/received-likes/:userId', async (req, res) => {
  try {
    const {userId} = req.params;
    const likes = await User.findById(userId).populate('receivedLikes.userId', 'firstName imageUrls prompts').select('receivedLikes')
    
    res.status(200).json({receivedLikes: likes});

  } catch (error) {
    console.error("Error receiving likes in backend :", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})



//endpoint to create a match between two users
app.post('/create-match', async (req, res) => {
  try {
    const {currentUserId, selectedUserId} = req.body;

    await User.findByIdAndUpdate(selectedUserId, {
      $push:{matches: currentUserId},
      $pull:{likedProfiles:currentUserId},
    });

    await User.findByIdAndUpdate(currentUserId, {
      $push:{matches:selectedUserId}
    });

    const updatedUser = await User.findByIdAndUpdate(currentUserId, {
      $pull: {receivedLikes: {userId: selectedUserId}}
    }, {new: true});

    if(!updatedUser){
      return res.status(404).json({message:"User not found"});
    }

    return res.status(200).json({message:"Users matched successfully"});

  } catch (error) {
    console.error("Error Matching Users :", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})


app.get('/get-matches/:userId', async(req, res) => {
  try {
    const {userId} = req.params;

    const user = await User.findById(userId).populate('matches', "firstName imageUrls");

    if(!user){
      return res.status(404).json({message:"User not found"});
    }

    const matches = user.matches;

    return res.status(200).json({matches});

  } catch (error) {
    console.error("Error Retrieving Matches :", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

io.on('connection', socket => {
  console.log("USER IS CONNECTED WITH THE SOCKET");

  socket.on('sendMessage', async (data) => {
      try {
          const { senderId, receiverId, message } = data;  // Ensure message is extracted

          const newMessage = new Chat({ senderId, receiverId, message });

          await newMessage.save();

          // Instead of `io.to(receiverId)`, use broadcasting or rooms
          socket.broadcast.emit('receivedMessage', newMessage);

      } catch (error) {
          console.log("Error handling the messages", error);
      }
});

  socket.on('disconnect', () => {
      console.log('User Disconnected');
  });
});


app.get('/messages', async(req, res) => {
  try {
    const {senderId, receiverId} = req.query;
    const messages = await Chat.find({
      $or:[
        {senderId:senderId, receiverId:receiverId},
        {senderId:receiverId, receiverId:senderId}
      ]
    }).populate('senderId', '_id firstName');

    res.status(200).json(messages);

  } catch (error) {
    console.error("Error Receiving Messages :", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



app.put('/update-user/:userId', async (req, res) => {
  const { userId } = req.params;
  const updatedData = req.body;

  try {
    // Find the user by userId and update only the fields provided in the request body
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the updated user data as a response
    return res.status(200).json(updatedUser);
  } catch (err) {
    console.error('ERROR UPDATING USER :',err);
    return res.status(500).json({ message: "Internal server error" });
  }
});


// io.on('connection', socket => {
//   console.log("USER IS CONNECTED WITH THE SOCKET");

//   socket.on('sendMessage', async(data) => {
//     try {
//       const {senderId, receiverId, message} = data;
      
//       const newMessage = new Chat({senderId, receiverId, message});

//       await newMessage.save();

//       io.to(receiverId).emit('receivedMessage', newMessage);

//     } catch (error) {
//       console.log("Error handling the messages", error);
//     }

//     socket.on('disconnect', () => {
//       console.log('User Disconnected');
//     })
//   })
// });

// http.listen(8000, () => {
//   console.log("Socket.io running on port 7000");
// })