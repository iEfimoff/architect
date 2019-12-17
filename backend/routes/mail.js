const express = require('express')
const nodemailer = require('nodemailer')

const router = express.Router()

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER_NAME,
  SMTP_USER_PASSWORD
} = process.env

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_USER_NAME,
    pass: SMTP_USER_PASSWORD
  }
})

router.post('/', (req, res) => {
  const { to, subject, message } = req.body
  transporter.sendMail({
    from: SMTP_USER_NAME,
    to,
    subject,
    text: message
  }, (error, info) => {
    res.json(error ? { error } : { status: info.response })
  })
})

module.exports = router