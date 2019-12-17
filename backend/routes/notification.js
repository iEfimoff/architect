const express = require('express')
const fetch = require('node-fetch')
const router = express.Router()

const post = async (path, body) => {
  const req = await fetch(`http://localhost:5000${path}`, {
    "headers": {
      "accept": "application/json",
      "content-type": "application/x-www-form-urlencoded",
    },
    body,
    "method": "POST"
  })
  return await req.json()
}

router.post('/', async (req, res) => {
  try {
    const { to, title, message } = req.body
    const push = await post('/push/send', `title=${title}&message=${message}`)
    const mail = await post('/mail', `to=${to}&subject=${title}&message=${message}`)
    res.json({ push, mail })
  } catch (e) {
    res.json({ error: e })
  }
})

module.exports = router
