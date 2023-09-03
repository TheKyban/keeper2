import { createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

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
        switchTask: async (state, action) => {
            const { source, destination } = action.payload;
            const desIndex = destination.index;
            const [destId, dlistIdx] = destination.droppableId.split('-');
            const [sourceId, slistIdx] = source.droppableId.split('-');

            const desList = state.tasks[dlistIdx];
            const isAnotherTaskExist = destination.index <= (desList.tasks.length - 1);
            console.log(isAnotherTaskExist);

            const task = state.tasks[slistIdx].tasks[source.index];
            task.list = destId;

            //delete task
            state.tasks[slistIdx].tasks.splice(source.index, 1);

            // add to another list
            state.tasks[dlistIdx].tasks.splice(destination.index, 0, task);

            if (!isAnotherTaskExist) {
                // create task
                api.createTask({ listId: task.list, boardId: task.board, name: task.name, description: task.description });
                // delete task
                api.deleteTask({ id: task._id });
                // console.log(data);
            }
            console.log(JSON.parse(JSON.stringify(task)));
        }
    }
});

export const { setTasks, addTask, switchTask } = taskSlice.actions;
export default taskSlice.reducer;