import styles from "./SideBar.module.scss";
import arrow from "../../assets/arrow.png";
import logoutIcon from "../../assets/logout.png";
import api from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { setAuthentication, setUser } from "../../redux/slices/userSlice";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { addBoard } from "../../redux/slices/boardSlice";
import Board from "../Board/Board";

const SideBar = ({ closeHandler }) => {
	const boards = useSelector((slice) => slice.board.boards);
	const dispatch = useDispatch();
	const [shouldAdd, setShouldAdd] = useState(false);

	const logoutController = async () => {
		await api.logout();
		dispatch(setAuthentication(false));
		dispatch(setUser({}));
	};

	// createBaord
	const CreateBoardHandler = async (name, setName) => {
		if (name.length < 1) {
			toast.error("Please Enter Board Name");
			return;
		}
		const { data } = await api.createBoard({ name });
		if (data.success) {
			toast.success(data.message);
			dispatch(addBoard(data.board));
		}
		setName("");
		setShouldAdd(false);
	};

	return (
		<div className={styles.sidbarWrapper}>
			<div className={styles.sidebar}>
				<div className={styles.heading}>
					<h4>Aditya's Workspace</h4>
					<div className={styles.arrow} onClick={closeHandler}>
						<img src={arrow} alt="close" />
					</div>
				</div>
				<div className={styles.boardWrapper}>
					<div className={styles.boardHeadingWrapper}>
						<div className={styles.boardHeading}>
							<h5>Your Boards</h5>
							<span onClick={() => setShouldAdd(!shouldAdd)}>
								{shouldAdd ? "-" : "+"}
							</span>
						</div>
						{shouldAdd && (
							<CreateBoard
								createBoardHandler={CreateBoardHandler}
							/>
						)}
					</div>
					<div className={styles.boards}>
						{boards?.map((board, idx) => (
							<Board board={board} key={board._id} idx={idx} />
						))}
					</div>
				</div>
			</div>
			<div className={styles.logoutWrapper}>
				<img
					src={logoutIcon}
					alt="logout"
					className={styles.logout}
					onClick={logoutController}
				/>
			</div>
		</div>
	);
};

const CreateBoard = ({ createBoardHandler }) => {
	const [name, setName] = useState("");
	return (
		<div className={styles.createBoard}>
			<input
				className={styles.name}
				placeholder="Enter Board name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<button
				className={styles.createBtn}
				onClick={() => createBoardHandler(name, setName)}
			>
				Create
			</button>
		</div>
	);
};
export default SideBar;
