const router = require('express').Router();
const userController = require('../controllers/api-routes');
router.get('/users', userController.getUser);
const {
    getAllUsers, 
    createUser, 
    deleteUser, 
    getUserById, 
    updateUser, 
    createFriend, 
    deleteFriend
} = require('../controllers/api-routes')

router
.route('/')
.get(getAllUsers)
.post(createUser);

router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

router
.route('/:userId/friends/:friendId')
.post(createFriend)
.delete(deleteFriend);

module.exports = router;