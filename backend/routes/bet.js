const express = require('express')
const router = express.Router()

const bets = []

router.get('/', (req, res) => {
  res.json(bets)
})

router.post('/', (req, res) => {
  // TODO: check session token req.param('session')
  // Not implemented yet
  res.json({ status: 'ok' })
})

module.exports = router