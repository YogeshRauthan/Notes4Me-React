const connectToMongo = require('./db'); // v-55
const express = require('express')
const cors = require('cors')

connectToMongo();

const app = express()
const port = 5000

//using middleware
app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth_route'))
app.use('/api/notes', require('./routes/notes_route'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
