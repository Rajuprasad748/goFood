const express = require('express')
const router = require('./createUser')
const app = express()


router.post('/foodData', (req,res)=> {
    try {
        res.send([global.foodItems, global.foodCategory])
    } catch (error) {
        console.error(error.message)
        res.send("Error Occured");
    }
})


module.exports = router;