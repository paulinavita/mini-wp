const router = require('express').Router()
const {UserController} = require('../controllers')
const {authorized} = require('../middleware/authorized')
const {authentication} = require('../middleware/authentication')
const {verifyUser} = require('../middleware/verifyUser')


router.get('/', authentication, UserController.findAll)
router.get('/:username', authentication, UserController.findOne)
router.post('/', UserController.register)
router.post('/verify', verifyUser)

module.exports = router