const {Article} = require('../models')

class ArticleController {

    static create(req, res) {
        console.log(req.body, 'masuk sinoy')
        let newArticle = new Article({ ...req.body, userId: req.authenticatedUser.id })
        newArticle.save()
        .then(saved => {
            console.log('berhasil save')
            res.status(201).json(saved)
        })
        .catch(err => {
            console.log('gagal create atc')
            res.status(400).json(err)
        })

    }

    static update(req, res) {
        console.log('updating atc')
        Article.findOneAndUpdate({ _id: req.params.id },  { $set: req.body }, {new : true})
            .then(found => {
                if (found) {
                    res.status(200).json(found)
                } else {
                    res.status(404).json({ message: `No such id exist` })
                }
            })
            .catch(err => {
                console.log('err di bag updadte')
                res.status(400).json(err)
            })
    }

    static delete(req, res) {
        console.log('mau ngedelet???????')
        Article
            .findOneAndDelete({ _id: req.params.id })
            .then(found => {
                console.log('deleting one atc')
                if (!found) {
                    res.status(404).json({ message: `No such id exist` })
                } else {
                    res.status(200).json(found)
                }
            })
            .catch(err => {
                console.log('err bag delete')
                res.status(400).json(err)
            })
    }

    static findOne(req, res) {
        Article.findOne({ _id: req.params.id })
            .then(found => {
                if (found) res.status(200).json(found)
                else res.status(404).json({ message: `No such id exist` })
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    }

    static findByUser(req, res) {
        Article
            .findById(req.params.id)
            .then(article => {
                res.status(200).json(article)
            })
            .catch(err => {
                res.status(500).json(err)
            })

    }

    static findAll(req, res) {
        console.log('req auth', req.authenticatedUser)
        let query = {}
        if (req.query) {
            let arr = []
            let field = Object.keys(req.query)
            field.forEach((keyword) => {
                arr.push({
                    [keyword]: { $regex: new RegExp(req.query[keyword], "i") }
                })
            })
            if (arr.length > 0) {
                query = { $or: arr }
            }
            // console.log(arr)
        }
        Article.find({
            $and : [
                {userId : req.authenticatedUser.id},
                query
            ]
        })
        .populate('userId')
        .then(articles => {
            res.status(200).json(articles)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }
    
}


module.exports = ArticleController