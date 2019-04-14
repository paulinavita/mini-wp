const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { randomizer } = require('../helpers/randomizer')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const axios = require('axios')

class UserController {
    static register(req, res) {
    User.create({ ...req.body })
        .then(saved => {
            console.log('berhasil bikin user')
            res.status(201).json({ data: saved })
        })
        .catch(err => {
            console.log(err)
            console.log('err bagian create')
            res.status(400).json({ err })
        })
    }

    static findOne(req, res) {
        User
        .findOne({username : req.params.username})
        .then(foundUser => {
            if (foundUser) {
                console.log(foundUser, 'ketemu.')
                res.status(200).json(foundUser);
            } else {
                res.status(404).json({err : 'No such user exist'})
            }
        })
        .catch(err => {
            console.log('err bagian findone')
            res.status(400).json({err})
        })
    }

    static findAll (req, res) {
        User
        .find()
        .then(users => {
            console.log('dapat findall')
            res.status(200).json(users)
        })
        .catch(err => {
            console.log('ini error findall')
            res.status(400).json({err})
        })
    }

    static local(req, res) {
        console.log(req.body, '....')
        if (req.body.email == '') {
            res.status(400).json({message : 'Username cannot be empty!'})
        }
        if (req.body.password == '') {
            res.status(400).json({message : 'Password cannot be empty!'})
        }
        User.findOne({
            email: req.body.email
        })
        .then((user) => {
            console.log('ini yg login', user)
            if (!user) {
                res.status(400).json({
                    msg: 'Email not found'
                })
            } else {
                if (!bcrypt.compareSync(req.body.password, user.password)) {
                    res.status(400).json({
                        msg: 'Password invalid'
                    })
                } else {
                    const { username, email, _id } = user
                    let token = jwt.sign({
                        id: _id,
                        email,
                        username
                    }, process.env.JWT_SECRET);
                    console.log(token, 'dpt tokeeen')
                    res.status(200).json({ token, _id, username, email })
                }
            }
        })
        .catch(err => {
            console.log('error di bag local')
            res.status(400).json(err)
        })
    }

    static google(req, res) {
        let payload = null
        let token = null;
        console.log('sign in google')
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket => {
            payload = ticket.getPayload();
            return User.findOne({ email: payload.email })
        })
        .then((user) => {
            if (!user) {
                console.log('new acc google')
                let obj = {
                    username: payload.name,
                    email: payload.email,
                    password: randomizer()
                }
                return User.create(obj)
                    .then((newUser) => {
                        token = jwt.sign({
                            id: newUser._id,
                            email: payload.email,
                            username: payload.name,
                        }, process.env.JWT_SECRET)
                        res.status(201).json({ token })
                    })
                    .catch(err => {
                        throw err
                    })
            } else {
                console.log('member acc google')
                token = jwt.sign({ id: user._id, username: user.username, email: user.email },
                    process.env.JWT_SECRET,
                    { expiresIn: '24h' }
                );
                let id = user._id
                let username = user.username
                res.status(200).json({ token, id, username })
            }
        })
        .catch(err => {
            console.log('ini google error')
            res.status(500).json({ err })
        })
    }

    static getLoc(req, res) {
        axios.get(`http://ipgeolocationapi.com/api/geolocate`)
        .then(({data}) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
    }

    static getQuotes(req,res) {
        axios.get(`http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1`)
        .then(({data}) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
    }
}

module.exports = UserController