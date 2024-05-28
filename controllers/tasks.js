const TaskModel = require('../models/Tasks')
const asyncWrapper = require('../middleware/async-handle-try-catch')
const { createCustomError } = require('../errors/customError')

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await TaskModel.find()
    res.status(200).json({ tasks })

})

const createTask = asyncWrapper(async (req, res) => {
    const tasks = await TaskModel.create(req.body)
    res.status(201).json(tasks)

})

const updateTask = asyncWrapper(async (req, res, next) => {

    const { id: taskID } = req.params
    const task = await TaskModel.findOneAndUpdate({_id: taskID}, req.body, {
        new: true,
        runValidators: true
    })
    if (!task) {
        return next(createCustomError('no task with the mentioned ID',404))
    }
    res.status(200).json({ task })


})

const deleteTask = asyncWrapper(async (req, res, next) => {

    const { id: taskID } = req.params
    const tasks = await TaskModel.findOneAndDelete({_id: taskID})
    if (!tasks) {
        return next(createCustomError('no task with the mentioned ID',404))
    }
    res.status(200).json({  tasks })

})

const getTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params
    const task = await TaskModel.findOne({ _id: taskID })
    if (!task) {
      return next(createCustomError(`No task with id : ${taskID}`, 404))
    }
  
    res.status(200).json({ task })
  })

const editTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params
    const tasks = await TaskModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    })
    if (!tasks) {
        return next(createCustomError('no task with the mentioned ID',404))
    }
    res.status(200).json({ tasks })

})

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
    getTask,
    editTask
}