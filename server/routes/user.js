const router = require('express').Router()
const {UserController} = require('../controllers')
const {authorized} = require('../middleware/authorized')
const {authentication} = require('../middleware/authentication')
const {verifyUser} = require('../middleware/verifyUser')


router.post('/', UserController.register)
router.get('/', authentication, UserController.findAll)
router.get('/location', UserController.getLoc)
router.get('/randomquotes', UserController.getQuotes)
router.get('/:username', authentication, UserController.findOne)

module.exports = router