const express = require('express')
const md5 = require('md5')
const randomString = require('crypto-random-string')
const users = require('./user').users

const router = express.Router()

const sessions = []

const auth = (username, pass) => {
  return users.filter(user => {
    return user.name === username && user.pass === md5(username + pass)
  }).length === 1
}

router.get('/', (req, res) => {
  res.json(sessions)
})

router.post('/', (req, res) => {
  const { user: username, pass: password } = req.body
  if (auth(username, password)) {
    const sessionId = randomString({ length: 50 })
    sessions.push({
      userId: users.filter(user => user.name === username)[0].id,
      sessionId
    })
    res.json(sessionId)
  } else {
    res.json({
      error: 'incorrect user or password'
    })
  }
})

module.exports = { router, sessions }