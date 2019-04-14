const router = require ('express').Router()
const {ArticleController} = require('../controllers')
const {authentication} = require('../middleware/authentication')
const {authorizedUser} = require('../middleware/authorized')
const images = require('../middleware/images')

router.get('/all', ArticleController.findFromAllUsers)
router.use(authentication)
router.get('/?', ArticleController.findAll)
router.get('/:id', ArticleController.findOne)
router.post('/', images.multer.single('image'), images.sendUploadToGCS, ArticleController.create)
router.delete('/:id', authorizedUser, ArticleController.delete)
router.patch('/:id', images.multer.single('image'), images.sendUploadToGCS, authorizedUser, ArticleController.update)


module.exports = router