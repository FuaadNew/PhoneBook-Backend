
const { json } = require('body-parser')
const express = require('express')
const { now } = require('mongoose')
const app = express()

app.use(json)

let persons  = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const N = persons.length

app.get('/',(request,response)=>{
   response.send('<h1>Hello World</h1>')
})


app.get('/info',(request,response)=>{
    const Now =  new Date()

    response.send(`<p>Phonebook has info for ${N} people</p>
        <p> ${Now} </p>`)
    
 })
 
app.get('/api/persons',(request,response)=>{
    response.send(persons)
 })

app.delete('/api/persons/:id',(request,response)=>{
    const id = request.params.id
    persons = persons.filter(person => (person.id != id))
    response.status(204).end()
 })

 app.post('/api/persons/',(request,response)=>{
    const {name, number} = request.body
    const randomId = Math.floor(Math.random() * 10000) + 1;
    const newPerson = {
        id: `${randomId}`,
        name: `${name}`,
        number: `${number}`,
    }
    persons = persons.concat(newPerson)

    if (!name || !number) {
        return response.status(400).json({error: 'name or number is missing'})
    }

    if (persons.some(person => person.name == name)){
        return response.status(400).json({error: 'Names must be unique'})
    }
   
    response.json(persons)
 })


 app.get(`/api/persons/:id`,(request,response)=>{
    const id = request.params.id
    const responsePerson = persons.find(person => (person.id === id))
    if (responsePerson){
        response.send(responsePerson)
        return

    }
    response.status(404).end()
    
 })


const PORT = 3001

app.listen(PORT, () =>{
    console.log(`App running on port ${PORT}`)
}) 