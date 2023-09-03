import styles from "./Board.module.scss";
import api from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import threeDot from "../../assets/threeDot.png";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {
    deleteBoard,
    selectBoard,
    updateBoard,
} from "../../redux/slices/boardSlice";
import EditMenu from "../EditMenu/EditMenu";



const Board = ({ board, idx }) => {
    const { name: text, _id: id } = board;
    const [shoudEdit, setShouldEdit] = useState(false);
    const dispatch = useDispatch();
    const selected = useSelector((slice) => slice.board.selected);
    const selectBoardHandler = (board) => {
        dispatch(selectBoard(board));
    };
    const boardUpdateHandler = async (name, prevName) => {
        if (name.length < 1 || name === prevName) {
            toast.error("Please Enter New Board Name");
            return;
        }
        const { data } = await api.updateBoard({ id, name });

        if (data.success) {
            toast.success(data.message);
            dispatch(updateBoard({ idx, board: data.board }));
        }
        setShouldEdit(false);
    };

    const deleteBoardHandler = async () => {
        console.log(id);
        const { data } = await api.deleteboard({ id });
        console.log(data);
        if (data.success) {
            toast.success(data.message);
            dispatch(deleteBoard({ idx }));
        }
        setShouldEdit(false);
    };
    return (
        <div className={styles.singleBoardWrapper} onClick={() => selectBoardHandler(board)}>
            <div
                className={styles.board}
                style={{
                    backgroundColor: selected._id === id && "#92a0a1a9",
                }}
            >
                <span></span>
                <p>{text}</p>
                <div className={styles.threeDot} style={{ backgroundColor: shoudEdit && "#eeeedb" }}>
                    <img
                        src={threeDot}
                        alt=""
                        onClick={() => setShouldEdit(!shoudEdit)}
                    />
                </div>
            </div>
            {shoudEdit && (
                <EditMenu
                    currentName={text}
                    updateHandler={boardUpdateHandler}
                    deleteHandler={deleteBoardHandler}
                />
            )}
        </div>
    );
};



export default Board;