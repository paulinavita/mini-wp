

module.exports = {
    verifyUser( req, res, next) {
        if (req.body.token === req.authenticatedUser.token) {
            next()
        } else {
            res.status(400).json({message : 'You are unauthorized'})
        }
    }
}