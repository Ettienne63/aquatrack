const express = require("express")

const app = express()

const PORT = 3000

app.get("/",function(request,response){
    response.send("Welcome to the AquaTrack API!")
})

app.listen(PORT,function(){
    console.log(`Server is running on http://localhost:${PORT}`)
})