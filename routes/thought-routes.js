const router = require('express').Router();
const {getThought} = require('../../controllers/api-routes');
router.get('/:id', getThought);

const {
    addThought, 
    getThoughts, 
    getThoughtsById, 
    updateThought, 
    deleteThought, 
    createReaction, 
    deleteReaction 
} = require('../../controllers/api-routes');

router
.route('/')
.get(getThoughts)
.post(addThought);

router
.route('/:id')
.get(getThoughtsById)
.put(updateThought)
.delete(deleteThought);

router
.route('/:thoughtId/reactions')
.post(createReaction);

router
.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;