const express = require("express")
const app = express()
const fs = require("fs")



app.get("/files/:resID", (req, res) => {
    const file_name = req.params.resID
    fs.readFile(file_name, "utf-8", function(err,data){
        res.json({
            data
        })
    })
})

app.listen(3000);