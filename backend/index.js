const express = require('express')
const app = express()
const port = 5000;
const cors = require('cors');
const mongodb = require("./database")

mongodb();
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(cors());



app.use(express.json())
app.use('/api' , require('./routes/createUser'))
app.use('/api' , require('./routes/displayData'))
app.use('/api' , require('./routes/OrederData'))
app.listen(port)