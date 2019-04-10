const router = require('express').Router()
const article = require('./article')
const signin = require('./signin')
const user = require('./user')

router.get('/', (req, res) => {
    res.status(200).json({msg : 'connected'})
})

router.use('/signin', signin)
router.use('/article', article)
router.use('/user', user)


module.exports = router