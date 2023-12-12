const app = require('express').Router();
const User = require('../models/User');
const Thought = require('../models/Thought');

// USERS----------------------------------------------------------------------------------

// GET all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single user by its _id and populated thought and friend data
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v');
        if (!user) {
            res.status(404).json({ message: 'No user found with that ID!' });
            return;
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};
module.exports = {
    getUser
};
// app.get('/users/:id', async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id)
//             .populate({
//                 path: 'thoughts',
//                 select: '-__v'
//             })
//             .populate({
//                 path: 'friends',
//                 select: '-__v'
//             })
//             .select('-__v');
//         if (!user) {
//             res.status(404).json({ message: 'No user found with that ID!' });
//             return;
//         }
//         res.status(200).json(user);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// POST a new user
app.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// PUT to update a user by its _id
app.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!user) {
            res.status(404).json({ message: 'No user found with that ID!' });
            return;
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE to remove user by its _id
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'No user found with that ID!' });
            return;
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// FRIENDS--------------------------------------------------------------------------------

// POST to add a new friend to a user's friend list
app.post('/users/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friend = await User.findById(req.params.friendId);
        if (!user) {
            res.status(404).json({ message: 'No user found with that ID!' });
            return;
        }
        if (!friend) {
            res.status(404).json({ message: 'No friend found with that ID!' });
            return;
        }
        user.friends.push(friend);
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE to remove a friend from a user's friend list
app.delete('/users/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friend = await User.findById(req.params.friendId);
        if (!user) {
            res.status(404).json({ message: 'No user found with that ID!' });
            return;
        }
        if (!friend) {
            res.status(404).json({ message: 'No friend found with that ID!' });
            return;
        }
        user.friends.pull(friend);
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// THOUGHTS------------------------------------------------------------------------------


// GET all thoughts
app.get('/thoughts', async (req, res) => {
    try {
        const thoughts = await Thought.find({});
        res.status(200).json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single thought by its _id
app.get('/thoughts/:id', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (!thought) {
            res.status(404).json({ message: 'No thought found with that ID!' });
            return;
        }
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
app.post('/thoughts', async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});

// PUT to update a thought by its _id
app.put('/thoughts/:id', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!thought) {
            res.status(404).json({ message: 'No thought found with that ID!' });
            return;
        }
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE to remove a thought by its _id
app.delete('/thoughts/:id', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.id);
        if (!thought) {
            res.status(404).json({ message: 'No thought found with that ID!' });
            return;
        }
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});

// REACTIONS----------------------------------------------------------------------------

// POST to create a reaction stored in a single thought's reactions array field
app.post('/thoughts/:thoughtId/reactions', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            res.status(404).json({ message: 'No thought found with that ID!' });
            return;
        }
        const reaction = await Reaction.create(req.body);
        thought.reactions.push(reaction);
        await thought.save();
        res.status(200).json(reaction);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE to pull and remove a reaction by the reaction's reactionId value
app.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            res.status(404).json({ message: 'No thought found with that ID!' });
            return;
        }
        const reaction = await Reaction.findByIdAndDelete(req.params.reactionId);
        if (!reaction) {
            res.status(404).json({ message: 'No reaction found with that ID!' });
            return;
        }
        thought.reactions.pull(reaction);
        await thought.save();
        res.status(200).json(reaction);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = app;