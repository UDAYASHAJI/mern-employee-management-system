const express = require('express');
const app = express();
const cors = require("cors");
const dotenv=require('dotenv').config()
app.use(express.json());


require('./db'); 


app.use(cors()) 
const PORT=process.env.PORT||3000

const router = require('./Router/router');

app.use('/api', router);


app.get('/ok', (req, res) => {
  res.send("hello from server");
});

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
