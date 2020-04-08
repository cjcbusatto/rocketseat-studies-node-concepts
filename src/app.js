const express = require('express')
const cors = require('cors')
const {uuid} = require('uuidv4')

const {isValidId} = require('./middlewares')

const app = express()

app.use(express.json())
app.use(cors())

// Add a middleware to validate if IDs follow UUIDv4 specification
// on routes where it is used
app.use('/repositories/:id', isValidId)

// Initialize the data storage :)
const repositories = []

app.get('/repositories', (request, response) => {
  return response.status(200).json(repositories)
})

app.post('/repositories', (request, response) => {
  const {title, url, techs} = request.body

  const id = uuid()
  const likes = 0
  const repository = {id, title, url, techs, likes}

  repositories.push(repository)

  return response.status(200).json(repository)
})

app.put('/repositories/:id', (request, response) => {
  const {id} = request.params
  const {title, url, techs} = request.body

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id,
  )

  if (repositoryIndex < 0) {
    return response.status(400).json({error: 'Repository not found'})
  }

  // Keep the previous counter of likes 
  const likes = repositories[repositoryIndex].likes
  const repository = {id, title, url, techs, likes}

  // Replace the previous object
  repositories[repositoryIndex] = repository

  return response.status(200).json(repository)
})

app.delete('/repositories/:id', (request, response) => {
  const {id} = request.params

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id,
  )

  if (repositoryIndex < 0) {
    return response.status(400).json({error: 'Repository not found'})
  }

  repositories.splice(repositoryIndex, 1)
  
  return response.sendStatus(204)
})

app.post('/repositories/:id/like', (request, response) => {
  const {id} = request.params

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id,
  )

  if (repositoryIndex < 0) {
    return response.status(400).json({error: 'Repository not found'})
  }

  // Update likes counter in the "data storage"
  repositories[repositoryIndex].likes += 1

  return response.status(200).json({
    likes: repositories[repositoryIndex].likes,
  })
})

module.exports = app
