import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
    name: "list",
    initialState: {
        lists: []
    },
    reducers: {
        setLists: (state, actions) => {
            state.lists = actions.payload;
        },
        addList: (state, actions) => {
            state.lists.push(actions.payload);
        },
        updateList: (state, actions) => {
            const { idx, list } = actions.payload;
            state.lists[idx] = list;
        },
        deleteList: (state, action) => {
            state.lists.splice(action.payload, 1);
        }
    }
});

export const { setLists, addList, updateList, deleteList } = listSlice.actions;
export default listSlice.reducer;