const express = require('express')
const router = express.Router()
const md5 = require('md5')

const admin_user_name = process.env.ADMIN_USER_NAME || 'admin'
const admin_user_password = process.env.ADMIN_USER_PASSWORD || '123'

const users = [
  {
    id: md5(Date.now()),
    name: admin_user_name,
    pass: md5(admin_user_name + admin_user_password)
  }
]

router.get('/', (req, res) => {
  res.json(users)
})

const generate6digits = () => {
  return Math.round(Math.random() * 900000) + 100000
}

router.post('/', (req, res) => {
  const user = req.body.user
  const pass = req.body.pass
  const email = req.body.email
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