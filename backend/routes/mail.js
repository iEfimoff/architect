const express = require('express')
const nodemailer = require('nodemailer')

const router = express.Router()

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER_NAME,
    pass: process.env.SMTP_USER_PASSWORD
  }
})

router.post('/', (req, res) => {
  const to = req.body.to
  const subject = req.body.subject
  const message = req.body.message
  transporter.sendMail({
    from: process.env.SMTP_USER_NAME,
    to,
    subject,
    text: message
  }, (error, info) => {
    res.json(error ? { error } : { status: info.response })
  })
})

module.exports = router