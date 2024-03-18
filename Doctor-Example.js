const express = require("express")
//const bodyParser = require("body-parser")
const app = express()
const PORT =3000
app.use(express.json());

var Users = [{
    name: "Nishan",
    kidneys: [{
        healthy: false,
    }, { 
        healthy: true
    }]
}]

app.get("/", (req,res) => {
    const johnKidneys = Users[0].kidneys;
    //console.log(johnKidneys);
    const johnTotalKidneys = Users[0].kidneys.length;
    const totalGoodKidneys = johnKidneys.filter(kidney => kidney.healthy).length
    const totalBadKidneys = johnTotalKidneys - totalGoodKidneys;
    // for(let i=0;i <johnTotalKidneys; i++){
    //     if(johnKidneys[i].healthy){
    //         totalGoodKidneys +=1
    //     }

    // }
  

    res.json({
        johnKidneys,
        totalGoodKidneys,
        totalBadKidneys
    })
})

app.post("/", (req,res) => {
    const isHealthy = req.body.isHealthy;
    Users[0].kidneys.push({
        healthy: isHealthy
    })

    res.json({
        msg: "Kidney is added"
    })
})

app.put("/", function(req,res) {
  if(isThereAtLeastOneUnhealthyKidney){
    for (let i=0; i<Users[0].kidneys.length;i++){
        Users[0].kidneys[i].healthy = true
    }
    
    res.json({
        "msg": "Kidney is Replaced, congrats"
    })
} else {
    res.status(411).json({
        msg: "There any no Bad Kidneys"
    })
}
})

app.delete("/", (req,res) => {
    
    
   const newKidneys = []
   const goodKidneys = Users[0].kidneys.filter((kidney) => kidney.healthy == false)
   
   if(isThereAtLeastOneUnhealthyKidney()){
    if(goodKidneys){
        newKidneys.push({
            healthy: true,
        })
    }
    // for (let i=0 ;i < Users[0].kidneys.length; i++){
    //     if (Users[0].kidneys[i].healthy){
    //         newKidneys.push({
    //             healthy: true
    //         })
    //     }
    // }
    Users[0].kidneys = newKidneys 

    res.json({
        msg: "Bad kidneys Removed"
    })
} else {
    res.status(411).json({
        msg: "You dont have any bad kidneys"
    })
}

})

function isThereAtLeastOneUnhealthyKidney(){
   let atleastOneUnhealthyKidney = false 
   for(let i=0;i<Users[0].kidneys.length;i++){
     if(!Users[0].kidneys[i].healthy){
        atleastOneUnhealthyKidney = true
     }
   }
   return atleastOneUnhealthyKidney;
}

app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
})
