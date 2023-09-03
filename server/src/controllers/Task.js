const Task = require('../models/Task.js');
const List = require('../models/List.js');
// create task
exports.createTask = async (req, res) => {
    const { boardId, listId, name, description } = req.body;
    try {
        if (!boardId || !listId) {
            return res.json({
                success: false,
                message: "provide listId and boardId"
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
            board: boardId,
            list: listId,
            name: name ? name : "untitled",
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
    const { listId, boardId } = req.body;
    try {
        if (!boardId && !listId) {
            return res.json({
                success: false,
                message: 'provide list Id or boardId'
            });
        }
        if (listId) {
            const allTask = await Task.find({ list: listId });
            return res.json(allTask);
        }

        if (boardId) {
            const allTask = await Task.find({ board: boardId });
            return res.json(allTask);
        }

    } catch (error) {
        console.log(error);
    }
};