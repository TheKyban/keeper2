const Task = require('../models/Task.js');
const List = require('../models/List.js');
// create task
exports.createTask = async (req, res) => {
    const { listId, name, description } = req.body;
    try {
        if (!listId || !name) {
            return res.json({
                success: false,
                message: "provide listId and task name"
            });
        }

        const isListExist = await List.findById(listId);

        if (!isListExist) {
            return res.json({
                success: false,
                message: "invalid list id"
            });
        }

        const task = await Task.create({
            list: listId,
            name,
            description
        });

        res.json({
            success: true,
            message: "task created",
            task
        });
    } catch (error) {
        console.log(error);
    }
};
// delete task
exports.deleteTask = async (req, res) => {
    const { id } = req.body;
    try {
        if (!id) {
            return res.json({
                success: false,
                message: 'Provide task id'
            });
        }

        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.json({
                success: false,
                message: 'invalid task id'
            });
        }
        res.json({
            success: true,
            message: 'task deleted',
        });
    } catch (error) {
        console.log(error);
    }
};
// update list
exports.updateTask = async (req, res) => {
    const { id, name, description, listId } = req.body;
    try {
        if (!id) {
            return res.json({
                success: false,
                message: 'Provide  task id'
            });
        }

        const task = await Task.findByIdAndUpdate(id, { name, description, list: listId });

        if (!task) {
            return res.json({
                success: false,
                message: 'invalid task id'
            });
        }
        const updatedTask = await Task.findById(id);
        res.json({
            success: true,
            message: 'task updated',
            board: updatedTask
        });
    } catch (error) {
        console.log(error);
    }
};
// find all list of a board
exports.findAllTasks = async (req, res) => {
    const { listId } = req.body;
    try {
        if (!listId) {
            return res.json({
                success: false,
                message: 'provide list Id'
            });
        }
        const allTask = await Task.find({ list: listId });
        res.json(allTask);

    } catch (error) {
        console.log(error);
    }
};