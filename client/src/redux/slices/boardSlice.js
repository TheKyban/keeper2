import { createSlice } from "@reduxjs/toolkit";

const boardSlice = createSlice({
    name: "board",
    initialState: {
        boards: [],
        selected: {}
    },
    reducers: {
        setBoards: (state, actions) => {
            state.boards = actions.payload;
        },
        addBoard: (state, action) => {
            state.boards.push(action.payload);
        },
        updateBoard: (state, actions) => {
            const { idx, board } = actions.payload;
            state.boards[idx] = board;
        },
        deleteBoard: (state, actions) => {
            const { idx } = actions.payload;
            state.boards.splice(idx, 1);
        },
        selectBoard: (state, actions) => {
            state.selected = actions.payload;
        }
    }
});


export const { setBoards, addBoard, updateBoard, deleteBoard, selectBoard } = boardSlice.actions;
export default boardSlice.reducer;