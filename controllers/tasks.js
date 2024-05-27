const TaskModel = require('../models/Tasks')
const asyncWrapper = require('../middleware/async-handle-try-catch')
const { createCustomError } = require('../errors/customError')

const getAllTasks = asyncWrapper(async (req, res) => {
    const data = await TaskModel.find()
    res.status(200).json({ success: true, data: data })

})

const createTask = asyncWrapper(async (req, res) => {
    const result = await TaskModel.create(req.body)
    res.status(201).json(result)

})

const updateTask = asyncWrapper(async (req, res, next) => {

    const { id } = req.params
    const task = await TaskModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    })
    if (!task) {
        return next(createCustomError('no task with the mentioned ID',404))
    }
    res.status(200).json({ success: true, data: task })


})

const deleteTask = asyncWrapper(async (req, res, next) => {

    const { id } = req.params
    const task = await TaskModel.findByIdAndDelete(id)
    if (!task) {
        return next(createCustomError('no task with the mentioned ID',404))
    }
    res.status(200).json({ success: true, deletedTask: task })

})

const getTask = asyncWrapper(async (req, res, next) => {
    const { id } = req.params
    const data = await TaskModel.findById(id)
    if (!data) {
        return next(createCustomError('no task with the mentioned ID',404))
    }
    res.status(200).json({ success: true, data: data })

})

const editTask = asyncWrapper(async (req, res, next) => {
    const { id } = req.params
    const task = await TaskModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    })
    if (!task) {
        return next(createCustomError('no task with the mentioned ID',404))
    }
    res.status(200).json({ success: true, data: task })

})

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
    getTask,
    editTask
}