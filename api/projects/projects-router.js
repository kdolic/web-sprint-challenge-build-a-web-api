// Write your "projects" router here!
// Write your "actions" router here!
const express = require('express')
const {validateProject, validateProjectId} = require('../../middleware/middleware')
const Projects = require('./projects-model')
const router = express.Router()

router.get('/', (req, res, next) => {
    Projects.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(next)
})

router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.actions)
})

router.post('/', validateProject, (req, res, next) => {
    Projects.insert(req.body)
    .then(projects => {
        res.status(201).json(projects)
    })
    .catch(next)
})

router.put('/:id', validateProject, validateProjectId, (req, res, next) => {
    const id = req.params.id
    const changes = req.body

    Projects.update(id, changes)
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(next)
})

router.delete('/:id', validateProjectId, (req, res, next) => {
    Projects.remove(req.params.id)
    .then(projects => [
        res.status(200).json(projects)
    ])
    .catch(next)
})

router.get('/:id/actions', validateProjectId, (req, res, next) => {
    const projectId = req.params.id

    Projects.getProjectActions(projectId)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
      message: err.message,
      stack: err.stack,
      custom: 'NOT WORKING!!!!',
    })
  })


module.exports = router
