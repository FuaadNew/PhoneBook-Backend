const mongoose = require('mongoose')

require('dotenv').config()

mongoose.set('strictQuery',false)
mongoose.connect(process.env.MONGO_URI)



const personSchema =  new mongoose.Schema({
 
  name: {
    type: String,
    minlength: 3,
    required: true
  }, 
  number: {
    type: String,
    minlength: 8,
    required: true
  }
})


personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  

  const Person = mongoose.model('person',personSchema)

  


  module.exports = Person