import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import boardSlice from './slices/boardSlice';
import listSlice from './slices/listSlice';
import taskSlice from './slices/taskSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        board: boardSlice,
        list: listSlice,
        task: taskSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export default store;