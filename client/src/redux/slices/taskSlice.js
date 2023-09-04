import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: "task",
    initialState: {
        tasks: [{ id: "", tasks: [] }]
    },

    reducers: {
        setTasks: (state, actions) => {
            state.tasks = actions.payload;
        },
        addTask: (state, actions) => {
            const { idx, task } = actions.payload;
            state.tasks[idx].tasks.push(task);
        },
        switchTask: (state, action) => {
            const { source, destination } = action.payload;
            let task;

            // delete from source
            for (let i = 0; i < state.tasks.length; i++) {
                if (state.tasks[i].id === source.droppableId) {

                    task = JSON.parse(JSON.stringify(state.tasks[i].tasks.splice(source.index, 1)))[0];

                    break;
                }
            }

            // change list id of task to destination list id
            task.list = destination.droppableId;

            // add to destination
            for (let i = 0; i < state.tasks.length; i++) {
                if (state.tasks[i].id === destination.droppableId) {
                    state.tasks[i].tasks.splice(destination.index, 0, task);
                    break;
                }
            }
        },
        updateTask: (state, action) => {
            const { task, index } = action.payload;

            for (let i = 0; i < state.tasks.length; i++) {
                if (state.tasks[i].id === task.list) {
                    state.tasks[i].tasks[index].name = task.name;
                    state.tasks[i].tasks[index].description = task.description;
                    break;
                }
            }
        },
        deleteTask: (state, action) => {
            const { task, index } = action.payload;
            for (let i = 0; i < state.tasks.length; i++) {
                if (state.tasks[i].id === task.list) {
                    state.tasks[i].tasks.splice(index, 1);
                    break;
                }
            }
        }
    },

});

export const { setTasks, addTask, switchTask, updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;