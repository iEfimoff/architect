const express = require('express')
const webpush = require('web-push')
const router = express.Router()

const db = { subscription: null }

const send = async (subscription, data = '') => {
  try {
    await webpush.sendNotification(subscription, data)
  } catch (e) {
    console.log('push.send', e)
  }
}

const save = async subscription => {
  db.subscription = subscription
}

webpush.setVapidDetails(
  'http://web.push.notification.test',
  process.env.PUSH_PUBLIC_KEY,
  process.env.PUSH_PRIVATE_KEY
)

router.get('/', (req, res) => {
  res.json(db)
})

router.get('/public/key', (req, res) => {
  res.send(process.env.PUSH_PUBLIC_KEY)
})

router.post('/save', async (req, res) => {
  const subscription = req.body
  await save(subscription)
  res.json({ status: 'success' })
})

router.post('/send', async (req, res) => {
  console.log(req.body)
  const subscription = db.subscription
  const title = req.body.title
  const message = req.body.message
  await send(subscription, JSON.stringify({
    title,
    message
  }))
  res.json({ status: 'message sent' })
})

module.exports = router