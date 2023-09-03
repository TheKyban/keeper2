const Board = require('../models/Board.js');
const List = require('../models/List.js');
// create list
exports.createList = async (req, res) => {
    const { boardId, name } = req.body;
    try {
        if (!boardId || !name) {
            return res.json({
                success: false,
                message: "provide boardid and list name"
            });
        }

        const board = await Board.findById(boardId);

        if (!board) {
            return res.json({
                success: false,
                message: "invalid board id"
            });
        }

        const list = await List.create({
            board: boardId,
            name
        });

        res.json({
            success: true,
            message: "List created",
            list
        });
    } catch (error) {
        console.log(error);
    }
};
// delete list
exports.deleteList = async (req, res) => {
    const { id } = req.body;
    try {
        if (!id) {
            return res.json({
                success: false,
                message: 'Provide List id'
            });
        }

        const list = await List.findByIdAndDelete(id);
        if (!list) {
            return res.json({
                success: false,
                message: 'invalid list id'
            });
        }
        res.json({
            success: true,
            message: 'list deleted',
        });
    } catch (error) {
        console.log(error);
    }
};
// update list
exports.updateList = async (req, res) => {
    const { id, name } = req.body;
    try {
        if (!id || !name) {
            return res.json({
                success: false,
                message: 'Provide list name and list id'
            });
        }

        const list = await List.findByIdAndUpdate(id, { name });
        if (!list) {
            return res.json({
                success: false,
                message: 'invalid list id'
            });
        }
        const updatedList = await List.findById(list._id);
        res.json({
            success: true,
            message: 'list updated',
            list: updatedList
        });
    } catch (error) {
        console.log(error);
    }
};
// find all list of a board
exports.findAllLists = async (req, res) => {
    const { boardId } = req.body;
    try {
        if (!boardId) {
            return res.json({
                success: false,
                message: 'provide board Id'
            });
        }
        const allLists = await List.find({ board: boardId });
        res.json(allLists);

    } catch (error) {
        console.log(error);
    }
};