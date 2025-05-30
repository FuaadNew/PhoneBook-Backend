const mongoose = require('mongoose')


const Person = require('./models/person')


const errorHandler = (error,request,response,next)=>{
  console.error(error.message)

  if (error.name === 'CastError'){
    return response.status(400).send({error: 'malformatted id'})
  }
  if (error.name === 'ValidationError'){
    return response.status(400).json({error: error.message})
  }
  next(error)
}





const { json } = require('body-parser')
const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')

app.use(morgan('tiny'))

app.use(json())
app.use(cors())




app.get('/',(request,response)=>{
   response.send('<h1>Hello World</h1>')
})


app.get('/info',(request,response)=>{
    const Now =  new Date()

    response.send(`<p>Phonebook has info for ${N} people</p>
        <p> ${Now} </p>`)
    
 })
 
app.get('/api/persons',(request,response)=>{
    Person.find({}).then(persons =>{
      response.send(persons)


    })
   
 })
 app.put('/api/persons/:id',(request,response,next)=>{
  const {name,number} = request.body
  const person = {
    name:name,
    number:number
  }

  Person.findByIdAndUpdate(request.params.id,person, {new: true}).then(updatedPersons=>{
    if (updatedPersons){
      response.json(updatedPersons)

    }else{
      response.status(404).json({error:'person not found'})
    }
    
  }).catch((error)=>next(error))




 })

app.delete('/api/persons/:id',(request,response,next)=>{
    Person.findByIdAndDelete(request.params.id).then(result=>{
      if (result){
        response.status(204).end()
      } else {
        response.status(404).end().json({error: 'person not found'})
      }
    })
    .catch(error=>{
      next(error)
    })
    

 })


 


 morgan.token('body', (req) => JSON.stringify(req.body))
 app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


 app.post('/api/persons/', async (request,response,next)=>{
  console.log('post request received')
   
    const {name, number} = request.body
    const newPerson = new Person({
        name: `${name}`,
        number: `${number}`,
    })
   
    if (!name || !number) {
      console.log('name or number is missing')
        return response.status(400).json({error: 'name or number is missing'})
    }
    const existingPerson = await Person.findOne({name: name})
    if (existingPerson){
      return response.status(400).json({error: 'Name must be unique'})
    }
  
   

    newPerson.save().then(result=>{
      response.json(result)
      
    }).catch(error=>{
     next(error)
      console.log(error)
    })

  
 })


 app.get(`/api/persons/:id`,(request,response, next)=>{
    Person.findById(request.params.id).then(person=>{
      if (person){
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error=>{
      next(error)
      
    })
    
    
    
    
    
 })


const PORT = 3001

app.listen(PORT, () =>{
    console.log(`App running on port ${PORT}`)
}) 

app.use(errorHandler)