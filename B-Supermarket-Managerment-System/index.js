const express= require('express')
const app = express()
const port= 8081

app.get('/',(req,res)=>{
    res.send("Welcome to rest API")
});

app.listen(port, ()=>{
    console.log('Server is running: http://localhost:'+port);
});