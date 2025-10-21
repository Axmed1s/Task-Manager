const express = require('express')
const router = express.Router()

const{
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
} = require('../controllers/task')

const auth = require('../middleware/auth')

// Protect all routes
router.use(auth)

router.route('/')
    .get(getAllTasks)
    .post(createTask)

router.route('/:id')
    .get(getTask)
    .patch(updateTask)
    .delete(deleteTask)


module.exports = router