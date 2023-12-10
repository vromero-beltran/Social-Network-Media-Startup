const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema(
    {
        // set custom id to avoid confusion with parent comment _id
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'Please enter your reaction',
            maxlength: 280
        },
        username: {
            type: String,
            required: 'Please enter your username'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // use getter method to format timestamp
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

module.exports = model('Reaction', ReactionSchema);