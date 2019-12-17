const express = require('express')
const webpush = require('web-push')
const router = express.Router()

const db = { subscription: null }

const send_notification = async (subscription, data = '') => {
  return await webpush.sendNotification(subscription, data)
}

const { PUSH_PUBLIC_KEY, PUSH_PRIVATE_KEY } = process.env

const save_subscription = async subscription => {
  db.subscription = subscription
}

webpush.setVapidDetails(
  'http://web.push.notification.test.new',
  PUSH_PUBLIC_KEY,
  PUSH_PRIVATE_KEY
)

router.get('/public/key', (req, res) => {
  res.send(PUSH_PUBLIC_KEY)
})

router.get('/get/subscription', (req, res) => {
  res.json(db)
})

router.post('/save/subscription', async (req, res) => {
  const subscription = req.body
  await save_subscription(subscription)
  res.json({ status: 'success' })
})

router.post('/send', async (req, res) => {
  const subscription = db.subscription
  const { title, message } = req.body
  try {
    await send_notification(subscription, JSON.stringify({
      title,
      message
    }))
    res.json({ status: 'message sent' })
  } catch (e) {
    res.json({ error: e })
  }
})

module.exports = router