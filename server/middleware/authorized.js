const jwt = require('jsonwebtoken');
const { authentication } = require('./authentication')
const {Article} = require('../models/')

module.exports = {
    authorizedUser: function (req, res, next) {
        Article.findOne({_id : req.params.id})
        .populate('userId')
        .then(foundArt =>{
            console.log(req.authenticatedUser, 'siaapapa')
            console.log(foundArt)
            if (foundArt.userId._id == req.authenticatedUser.id) {
                console.log('masuk')
                console.log(foundArt.userId._id, '==', req.authenticatedUser.id);
                
                next ()
            }
            else res.status(401).json({message : 'You are unauthorized'})
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }
}