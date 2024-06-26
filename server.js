const express = require('express')
const dotEnv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const Restarent = require('./Schemas/restarent')
//const Restarent_booking = require('./Schemas/booking')
const Users = require('./Schemas/users');

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




// Save restarent in db Api
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

// Get restarents data from Mongo db Api
app.get('/restarents', async (req,res) => {
   try {
       const allData = await Restarent.find();
       return res.json(allData) ;  
   } catch (error) {
      console.log(error.message)    
   }       
})

// delete restarent data in Mongo db Api
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

// Get particular restarent data from Mongo db Api
app.get('/restarents/:id', async (req,res) => {
   const {id} = req.params;

   try {
       const allData = await Restarent.findById(id);
       return res.json(allData) ;  
   } catch (error) {
      console.log(error.message)    
   }       
})

// Update partucular restarent data in Mongo db Api
app.put('/update-restarent/:id', async (req, res) => {
   let con = req.body;
   console.log(con)
   const {restarent_name,description,category,available,location,image} = con 
   try {
     const updateData = await Restarent.findByIdAndUpdate(req.params.id,
      {restarent_name,description,category,location,available,image} 
      );
     // Send response in here
     //res.send('Item Updated!');
    res.json(updateData)

   } catch(err) {
       console.error(err.message);
       res.send(400).send('Server Error');
}});





// Save users restarent table booking data in db Api
app.post('/save-bookings', async (req,res) => {
   let con = req.body;
   console.log(con)
   const {firstName,lastName,email,phoneNo,date,guest,message} = con       
   try {
      const newData = new Restarent_booking({firstName,lastName,email,phoneNo,date,guest,message});
      await newData.save();
      //return res.json(await Restarent.find())
      res.status(201).json(newData)    
   } catch (error) {
     console.log(error.message)     
     //res.status(500).json({message: 'server Error})
   }
})






 // User database crud Operation here we writen by Ramesh

 // Save registred Users in db Api
app.post('/add-user', async (req,res) => {
   let con = req.body;
   console.log(con)
   const {name,email,registation_date,phoneNo,status,user_image} = con
   try {
      const addUser = new Users({name,email,registation_date,phoneNo,status,user_image})
      await addUser.save();
      res.status(201).json(addUser)
   } catch (error) {
      console.log(error.message)
   }       
      
})

// Get registred users data from Mongo db Api
app.get('/users', async (req,res) => {
   try {
      const allData = await Users.find();
      return res.json(allData) ;  
  } catch (error) {
     console.log(error.message)    
  }

})

// Get particular registred user data from Mongo db Api
app.get('/users/:id', async (req,res) => {
   const {id} = req.params;
   try {
       const allData = await Users.findById(id);
       return res.json(allData) ;  
   } catch (error) {
      console.log(error.message)    
   }       
})

//Update a particular user data in Mongo db Api
app.put('/update-user/:id', async (req,res) => {
   let con = req.body;
   console.log(con)
   const {name,email,registation_date,phoneNo,status,user_image} = con
   try {
      const updateData = await Users.findByIdAndUpdate(req.params.id,
       {name,email,registation_date,phoneNo,status,user_image}
      )
      res.json(updateData)
   } catch (error) {
      console.error(error.message);
      res.send(400).send('Server Error');
   }

})

// Delete particular user data in Mongo db Api
app.delete('/delete-user/:id', async (req,res) => {
   const {id} = req.params;
   console.log(id)
   try {
      await Users.findByIdAndDelete(id)
      return res.json(await Users.find())
   } catch (error) {
      console.log(error.message)
   }
})














