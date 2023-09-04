import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import SlimSidebar from "../../components/slimSidebar/SlimSidebar";
import styles from "./Keeper.module.scss";
import List from "../../components/List/List";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/api";
import { addList, setLists } from "../../redux/slices/listSlice";
import { toast } from "react-hot-toast";
import { setTasks, switchTask } from "../../redux/slices/taskSlice";

const Keeper = () => {
    const [sidebar, setSidebar] = useState(true);
    const dispatch = useDispatch();
    const lists = useSelector(slice => slice.list.lists);
    const selectedBoard = useSelector(slice => slice.board.selected);
    const tasks = useSelector((slice) => slice.task.tasks);

    // fetch List on board change or select
    useEffect(() => {
        (async () => {
            const { data } = await api.fetchLists({ boardId: selectedBoard._id });
            dispatch(setLists(data));
        })();
    }, [selectedBoard]);

    // fetch Tasks
    useEffect(() => {
        (async () => {

            // checking board and list exists
            if (selectedBoard._id && lists[0]) {
                // fetching tasks
                const { data } = await api.fetchTasks({ boardId: selectedBoard._id });

                // short tasks
                const tempTasks = new Array();
                for (let i = 0; i < lists.length; i++) {
                    tempTasks.push({ id: lists[i]._id, tasks: [] });
                }

                for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < tempTasks.length; j++) {
                        if (tempTasks[j].id === data[i].list) {
                            tempTasks[j].tasks.push(data[i]);
                            break;
                        }
                    }
                }
                // set to state
                dispatch(setTasks(tempTasks));
            }
        })();
    }, [lists]);


    const DragEndHandler = async (result) => {
        try {
            console.log(result);
            const { source, destination, draggableId } = result;
            if (!destination.droppableId || destination.index === undefined) return;
            if (source.droppableId === destination.droppableId && source.index === destination.index) return;

            // change in redux store
            dispatch(switchTask({ source, destination }));

            // change in backend db
            const { data } = await api.changeTaskPosition({ taskId: draggableId, listId: destination.droppableId, position: destination.index });

        } catch (error) {
            console.log(error);
        }
    };


    /**
     * {
    "draggableId": "64f4b3b1fa4ce6fbaa1cc5b3",
    "type": "DEFAULT",
    "source": {
        "index": "64f4b3b1fa4ce6fbaa1cc5b3",
        "droppableId": "64f2e59318e35a20ec7e3766"
    },
    "reason": "DROP",
    "mode": "FLUID",
    "destination": {
        "droppableId": "64f2e59318e35a20ec7e3766",
        "index": "64f4a88b9d8860e421063ddc"
    },
    "combine": null
}
     */
    return (
        <div className={styles.keeper}>
            <div className={styles.left}>
                {sidebar ? (
                    <SideBar closeHandler={() => setSidebar(!sidebar)} />
                ) : (
                    <SlimSidebar closeHandler={() => setSidebar(!sidebar)} />
                )}
            </div>
            <div className={styles.right}>
                <DragDropContext onDragEnd={DragEndHandler}>
                    {
                        lists?.[0] && lists?.map((list, idx) => <List key={list._id} list={list} idx={idx} />)
                    }
                </DragDropContext>

                <CreateList />
            </div>
        </div>
    );
};


const CreateList = () => {
    const [shoudAdd, setShouldAdd] = useState(false);
    const [list, setList] = useState('');
    const dispatch = useDispatch();
    const selectedBoard = useSelector(slice => slice.board.selected);

    const createListHandler = async () => {
        if (list.length < 1 || !selectedBoard._id) {
            return;
        }
        const { data } = await api.createList({ name: list, boardId: selectedBoard._id });
        if (data.success) {
            toast.success(data.message);
            dispatch(addList(data.list));
        }

        setShouldAdd(false);
    };
    return shoudAdd ? (
        <div className={styles.addCard}>
            <input
                className={styles.title}
                placeholder="Enter List title"
                value={list}
                onChange={(e) => setList(e.target.value)}
                autoFocus
            />
            <div className={styles.btns}>
                <button className={styles.addCardBtn}
                    onClick={createListHandler}
                >
                    Add List
                </button>
                <button
                    className={styles.exitBtn}
                    onClick={() => setShouldAdd(!shoudAdd)}
                >
                    X
                </button>
            </div>

        </div>
    ) : (
        <div className={styles.anotherList} onClick={() => setShouldAdd(!shoudAdd)}>
            <span>+</span>
            <span>Add another list</span>
        </div>
    );
};
export default Keeper;
