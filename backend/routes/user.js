const express = require('express')
const router = express.Router()
const md5 = require('md5')

const {
  ADMIN_USER_NAME = 'admin',
  ADMIN_USER_PASSWORD = '123'
} = process.env

const users = [{
  id: md5(Date.now()),
  name: ADMIN_USER_NAME,
  pass: md5(ADMIN_USER_NAME + ADMIN_USER_PASSWORD)
}]

router.get('/', (req, res) => {
  res.json(users)
})

const generate6digits = () => {
  return Math.round(Math.random() * 900000) + 100000
}

router.post('/', (req, res) => {
  const { user, pass, email } = req.body
  const passcode = generate6digits()
  console.log(passcode)
  // TODO validate user name
  // TODO validate user password
  // TODO validate user email
  // TODO check on duplicates by username
  // TODO check on duplicates by email
  // TODO generate account binding link using passcode
  users.push({
    id: md5(Date.now()),
    name: user,
    pass: md5(user + pass),
    email,
    passcode
  })
  res.json({
    status: 'waiting for verification'
  })
})

module.exports = { router, users }