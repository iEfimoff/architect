const express = require('express')
const router = express.Router()
const md5 = require('md5')

const admin_user_name = process.env.ADMIN_USER_NAME || 'admin'
const admin_user_password = md5(process.env.ADMIN_USER_PASSWORD || '123')

const users = [
  {
    id: md5(Date.now()),
    name: admin_user_name,
    pass: admin_user_password
  }
]

router.get('/', (req, res) => {
  res.json(users)
})

const genrate6digits = () => {
  return Math.round(100000 + Math.random() * 900000)
}

router.post('/', (req, res) => {
  const user = req.param('user')
  const pass = req.param('pass')
  const email = req.param('email')
  const passcode = genrate6digits()
  // TODO validate user name
  // TODO validate user password
  // TODO validate user email
  // TODO check on duplicates by username
  // TODO check on duplicates by email
  // TODO generate account binding link using passcode
  users.push({
    id: md5(Date.now()),
    name: user,
    pass: md5(user) + md5(pass),
    email,
    passcode
  })
})

module.exports = { router, users }