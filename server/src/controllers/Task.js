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
        const position = (await Task.find({ list: listId })).length;
        const task = await Task.create({
            board: boardId,
            list: listId,
            name: name ? name : "untitled",
            description,
            position
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
    const { task } = req.body;
    try {
        if (!task) {
            return res.json({
                success: false,
                message: 'provide task'
            });
        }

        const deletedTask = await Task.findByIdAndDelete(task._id);
        if (!deletedTask) {
            return res.json({
                success: false,
                message: 'invalid task id'
            });
        }
        res.json({
            success: true,
            message: 'task deleted',
        });

        // decrease position in sourceList
        const allSourceTasks = await Task.find({ list: task.list });

        if (allSourceTasks.length === 0) return;

        for (let i = task.position; i < allSourceTasks.length; i++) {
            allSourceTasks[i].position--;
            allSourceTasks[i].save();
        }
    } catch (error) {
        console.log(error);
    }
};
// update list
exports.updateTask = async (req, res) => {
    const { id, name, description } = req.body;
    try {
        if (!id) {
            return res.json({
                success: false,
                message: 'Provide task id'
            });
        }




        const task = await Task.findByIdAndUpdate(id, { name, description });

        if (!task) {
            return res.json({
                success: false,
                message: 'invalid task id'
            });
        }
        res.json({
            success: true,
            message: 'Task updated',
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
            const allTask = await Task.find({ list: listId }).sort('position');
            return res.json(allTask);
        }

        if (boardId) {
            const allTask = await Task.find({ board: boardId }).sort('position');
            return res.json(allTask);
        }

    } catch (error) {
        console.log(error);
    }
};

exports.changeTaskPostion = async (req, res) => {
    const { taskId, listId, position } = req.body;
    try {
        if (!taskId || !listId || position === undefined) return;

        // increase postion on destinationList
        const allTasks = await Task.find({ list: listId });

        if (allTasks[position]?.position === position) {
            for (let i = position; i < allTasks.length; i++) {
                allTasks[i].position++;
                allTasks[i].save();
            }
        }

        const task = await Task.findByIdAndUpdate(taskId, {
            list: listId,
            position
        });


        // decrease position in sourceList
        const allSourceTasks = await Task.find({ list: task.list });
        if (allSourceTasks[position]?.position > position) {
            for (let i = position; i < allSourceTasks.length; i++) {
                allSourceTasks[i].position--;
                allSourceTasks[i].save();
            }
        }

        if (!task) {
            return res.json({
                message: "invalid Task id",
                success: false
            });
        }

        res.json({
            message: "position updated",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};