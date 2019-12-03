const express = require('express')
const md5 = require('md5')

const router = express.Router()

const sessions = []

const auth = (user, pass) => {
  return users.filter(user => user.name === user && pass === md5(user + pass)).length === 1
}

router.get('/', (req, res) => {
  res.json(sessions)
})

router.post('/', (req, res) => {
  const user = req.param('user')
  const pass = req.param('pass')
  if (auth(user, pass)) {
    const session = md5(Date.now()) + md5(user + Date.now())
    sessions.push({
      id: users.filter(user => user.name === name)[0].id,
      session
    })
  }
})

module.exports = { router, sessions }