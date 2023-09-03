import styles from "./List.module.scss";
import threeDot from "../../assets/threeDot.png";
import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "../Task/Task";
import EditMenu from "../EditMenu/EditMenu";
import { toast } from "react-hot-toast";
import api from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { deleteList, updateList } from "../../redux/slices/listSlice";
import { addTask } from "../../redux/slices/taskSlice";

const List = ({ list, idx }) => {
    const { name, _id: id } = list;
    const [shoudAdd, setShouldAdd] = useState(false);
    const [shoudEdit, setShouldEdit] = useState(false);
    const tasks = useSelector((slice) => slice.task?.tasks?.[idx]?.tasks);
    const dispatch = useDispatch();

    const updateHandler = async (name, prevName) => {
        if (name.length < 1 || name === prevName) {
            toast.error("Please Enter New Name");
            return;
        }
        const { data } = await api.updateList({ id, name });

        if (data.success) {
            toast.success(data.message);
            dispatch(updateList({ idx, list: data.list }));
        }
        setShouldEdit(false);
    };

    const deleteHandler = async () => {
        const { data } = await api.deleteList({ id });
        console.log(data);
        if (data.success) {
            toast.success(data.message);
            dispatch(deleteList(idx));
        }
        setShouldEdit(false);
    };

    return (
        <div className={styles.listWrapper}>
            <div className={styles.top}>
                <span>{name}</span>
                <div className={styles.threeDot}>
                    <img
                        src={threeDot}
                        alt="menu"
                        style={{ backgroundColor: shoudEdit && "#eeeedb" }}
                        onClick={() => setShouldEdit(!shoudEdit)}
                    />
                    {shoudEdit && (
                        <EditMenu
                            style={{
                                position: "absolute",
                                top: "30px",
                                right: 0,
                            }}
                            currentName={name}
                            updateHandler={updateHandler}
                            deleteHandler={deleteHandler}
                        />
                    )}
                </div>
            </div>
            {
                <Droppable droppableId={`${id}-${idx}`}>
                    {(provided, snapshot) => (
                        <div
                            className={styles.task}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {/* Task Here */}

                            {tasks && tasks.map((task, idx) => {
                                return <Task task={task} index={idx} key={task._id} />;
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            }
            <div className={styles.bottom}>
                {shoudAdd ? (
                    <AddTask setShouldAdd={setShouldAdd} shoudAdd={shoudAdd} listId={id} idx={idx} />
                ) : (
                    <div
                        className={styles.shouldAdd}
                        onClick={() => setShouldAdd(!shoudAdd)}
                    >
                        <span>+</span>
                        <span>Add a card</span>
                    </div>
                )}
            </div>
        </div>
    );
};

const AddTask = ({ setShouldAdd, shoudAdd, listId, idx }) => {
    const [task, setTask] = useState('');
    const [description, setDescription] = useState("");
    const boardId = useSelector(slice => slice.board.selected._id);
    const dispatch = useDispatch();

    const createTask = async () => {
        if (task.length < 1 && !boardId) return;
        const { data } = await api.createTask({ listId, boardId, name: task, description });

        if (data.success) {
            toast.success(data.message);
            dispatch(addTask({ idx, task: data.task }));
            setShouldAdd(false);
        }
    };
    return (
        <div className={styles.addCard}>
            <input className={styles.title} placeholder="Enter Title here"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                autoFocus
            />
            <input
                className={styles.description}
                placeholder="Enter Description here"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <div className={styles.btns}>
                <button className={styles.addCardBtn} onClick={createTask}>Add Card</button>
                <button
                    className={styles.exitBtn}
                    onClick={() => setShouldAdd(!shoudAdd)}
                >
                    X
                </button>
            </div>
        </div>
    );
};
export default List;
