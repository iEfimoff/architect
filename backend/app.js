const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const auth = require('./routes/auth')
const bet = require('./routes/bet')
const random01 = require('./routes/random01')
const user = require('./routes/user')
const wallet = require('./routes/wallet')
const notification = require('./routes/notification')
const mail = require('./routes/mail')
const push = require('./routes/push')

const app = express()
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Listening on port ${port}`))

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/auth', auth.router)
app.use('/bet', bet)
app.use('/random01', random01)
app.use('/user', user.router)
app.use('/wallet', wallet)
app.use('/notification', notification)
app.use('/mail', mail)
app.use('/push', push)