const express = require('express')
const Person = require('../models/person')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

// Must be signed in to read or write people
router.use('/people', authMiddleware.authenticateJWT)

router
.route('/people')
// User must be signed in to list people
.get(authMiddleware.ensureRole('people:read'), (req, res) => {
    Person.find()
        .then(people => {
            res.json(people)
        })
        .then(error => {
            res.json({ error })
        })
})
.post(authMiddleware.ensureRole('people:write'), (req, res) => {
    const newPerson = req.body
    Person.create(newPerson)
        .then(person => {
            res.json(person)
        })
        .then(error => {
            res.json({ error })
        })
})

router
.param('id', (req, res, next, id) => {
    req.itemQuery = Person.findById(id)
    next()
})

router.route('/people/:id')
.get(authMiddleware.ensureRole('people:read'), (req, res) => {
    req.itemQuery
        .then(person => {
            res.json(person)
        })
        .catch(error => {
            res.status(404).json({ error })
        })
})
.put(authMiddleware.ensureRole('people:write'), (req, res) => {
    const newPerson = req.body
    req.itemQuery.update(newPerson)
        .then(() => {
            res.json(newPerson)
        })
        .catch(error => {
            res.status(404).json({ error })
        })
})
.delete(authMiddleware.ensureRole('people:write'), (req, res) => {
    req.itemQuery.remove()
        .then(() => {
            res.status(204).json({})
        })
        .catch(error => {
            res.status(404).json({ error })
        })
})

module.exports = router