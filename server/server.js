const express = require("express")
const config = require("./config/config")

const app = express()


app.get("/",function(request,response){
    response.send("Welcome to the AquaTrack API!")
})

app.get("/api/health",function(request,response){
    response.json({
        status: "ok",
        message: "AquaTrack API is runnning"
    })
})
app.listen(config.PORT,function(){
    console.log(`Server is running on http://localhost:${config.PORT}`)
})