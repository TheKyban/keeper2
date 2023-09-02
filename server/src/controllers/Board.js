const Board = require('../models/Board.js');

// create
exports.createBoard = async (req, res) => {
    const { name } = req.body;
    try {
        if (!name) {
            return res.json({
                success: false,
                message: 'Provide Board name'
            });
        }

        const board = await Board.create({
            user: req.user,
            name
        });

        return res.json({
            success: true,
            message: 'Board created',
            board
        });

    } catch (error) {
        console.log(error);
    }
};
// delete
exports.deleteBoard = async (req, res) => {
    const { id } = req.body;
    try {
        if (!id) {
            return res.json({
                success: false,
                message: 'Provide Board id'
            });
        }

        const board = await Board.findByIdAndDelete(id);
        if (!board) {
            return res.json({
                success: false,
                message: 'invalid board id'
            });
        }
        res.json({
            success: true,
            message: 'Board deleted',
        });
    } catch (error) {
        console.log(error);
    }
};
// update
exports.updateBoard = async (req, res) => {
    const { id, name } = req.body;
    try {
        if (!id || !name) {
            return res.json({
                success: false,
                message: 'Provide Board id and name'
            });
        }

        // const board = await Board.updateOne({ _id: id }, { name });
        const board = await Board.findByIdAndUpdate(id, { name });
        const updatedBoard = await Board.findById(board._id);
        if (!board) {
            return res.json({
                success: false,
                message: 'invalid board id'
            });
        }
        res.json({
            success: true,
            message: 'Board updated',
            board: updatedBoard
        });
    } catch (error) {
        console.log(error);
    }
};

// find all boards
exports.findAllBoards = async (req, res) => {
    try {
        const allBoards = await Board.find({ user: req.user });
        res.json(allBoards);

    } catch (error) {
        console.log(error)
    }
};