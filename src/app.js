const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body
  const id = uuid()

  const newRepository = {
    id,
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(newRepository)

  return response.json(newRepository)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body

  const repositoryToBeChangedId = repositories.findIndex(repository => repository.id == id)

  if (repositoryToBeChangedId < 0) {
    return response.status(400).json({ error: "Repository doesn't exist" })
  }

  repositories[repositoryToBeChangedId].title = title
  repositories[repositoryToBeChangedId].url = url
  repositories[repositoryToBeChangedId].techs = techs

  return response.json(repositories[repositoryToBeChangedId])

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repositoryToBeDeletedId = repositories.findIndex(repository => repository.id == id)

  if (repositoryToBeDeletedId < 0) {
    return response.status(400).json({ error: "Repository doesn't exist" })
  }

  repositories.splice(repositoryToBeDeletedId, 1)

  return response.status(204).json({ message: "Repository deleted" })

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const repositoryToByLikedId = repositories.findIndex(repository => repository.id == id)

  if (repositoryToByLikedId < 0) {
    return response.status(400).json({ message: "Repository doesn't exist" })
  }

  repositories[repositoryToByLikedId].likes = repositories[repositoryToByLikedId].likes + 1

  return response.json(repositories[repositoryToByLikedId])

});

module.exports = app;
