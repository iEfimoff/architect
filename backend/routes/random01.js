const express = require('express')
const router = express.Router()

const random01 = () => Math.round(Math.random())

router.get('/', (req, res) => {
  res.json(random01())
})

module.exports = router