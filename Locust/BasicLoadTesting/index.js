const express = require('express');
const app = express();
const PORT = 3000;



app.get('/slow', (req, res) => {
    setTimeout(() => {
        res.send("Slow");
    }, 2000);
})

app.get('/hello', (req, res) => {
  res.send('Hello')
})

app.listen(PORT , ()=>{
    console.log("Server is up");
})