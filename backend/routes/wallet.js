const express = require('express')
const md5 = require('md5')
const router = express.Router()

const wallet = [{
  id: md5(Date.now()),
  usd: 100,
  btc: 0.821212182192819
}]

router.get('/', (req, res) => {
  res.json(wallet)
})

module.exports = router