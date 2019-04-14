const jwt = require('jsonwebtoken')

module.exports = {
    authentication: function (req, res, next) {
        if (req.headers.hasOwnProperty('token')) {
            const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
            req.authenticatedUser = decoded
            next()
        } else {
            console.log('401 not logged in!')
            res.status(401).json({
                message: 'You are not logged in'
            })
        }
    }
}