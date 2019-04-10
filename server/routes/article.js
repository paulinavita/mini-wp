const router = require ('express').Router()
const {ArticleController} = require('../controllers')
const {authentication} = require('../middleware/authentication')
const {authorizedUser} = require('../middleware/authorized')

router.get('/?', authentication, ArticleController.findAll)
router.get('/:id', authentication, ArticleController.findOne)
router.post('/',authentication, ArticleController.create)
router.delete('/:id', authentication, authorizedUser, ArticleController.delete)
router.patch('/:id', authentication, authorizedUser, ArticleController.update)

module.exports = router