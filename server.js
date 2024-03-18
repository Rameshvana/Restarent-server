const express = require('express')
const dotEnv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const Restarent = require('./model')

dotEnv.config()
const PORT = process.env.PORT || 8000

app.use(express.json())

app.use(cors())

mongoose.connect(process.env.mango_Url)
.then(() => {
   console.log("Mongodb Connected Successfully!")       
})
.catch((error) => {
    console.log('Error',error)      
})

//const PORT = 8000;
app.listen(PORT, () => {
   console.log(`Server is running at localhost ${PORT}`)       
})

app.get('/', (req,res) => {
   res.send(`<h1>Hello Ramesh`)       
})

app.post('/add-restarent', async (req,res) => {
   let con = req.body;
   console.log(con)
   const {restarent_name,description,category,available,location,image} = con       
   try {
      const newData = new Restarent({restarent_name,description,category,location,available,image});
      await newData.save();
      //return res.json(await Restarent.find())
      res.status(201).json(newData)    
   } catch (error) {
     console.log(error.message)     
     //res.status(500).json({message: 'server Error})
   }       
})

app.get('/restarents', async (req,res) => {
   try {
       const allData = await Restarent.find();
       return res.json(allData) ;  
   } catch (error) {
      console.log(error.message)    
   }       
})

app.delete('/delete-restarent/:id', async (req,res) => {
   const {id} = req.params;
   console.log(id)
   try {
      await Restarent.findByIdAndDelete(id)
      return res.json(await Restarent.find())
   } catch (error) {
      console.log(error.message)
   }
})