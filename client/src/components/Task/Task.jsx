import { Draggable } from "react-beautiful-dnd";
import styles from "./Task.module.scss";
import edit from "../../assets/edit.png";
import { useState } from "react";
import deleteIcon from "../../assets/delete.png";
import { useDispatch } from "react-redux";
import { updateTask } from "../../redux/slices/taskSlice";
import api from "../../api/api";
import { toast } from 'react-hot-toast';
import { deleteTask } from '../../redux/slices/taskSlice';

const Task = ({ index, task }) => {
	const [show, setShow] = useState(false);
	const [shouldEdit, setShouldEdit] = useState(false);
	const { _id: id } = task;
	const dispatch = useDispatch();

	const updateHandler = async (newValues) => {
		if (
			newValues?.name !== task?.name ||
			newValues?.description !== task?.description
		) {
			dispatch(
				updateTask({
					task: {
						...task,
						name: newValues.newName,
						description: newValues.newDescription,
					},
					index,
				}),
			);
			setShouldEdit(false);

			const { data } = await api.updateTask({
				id: task._id,
				name: newValues.newName,
				description: newValues.newDescription,
			});

			if (data.success) {
				toast.success(data.message);
				return;
			}
			if (!data.success) {
				toast.error(data.message);
			}
		}
	};

	const deleteHandler = async () => {
		dispatch(deleteTask({ task, index }));
		const { data } = await api.deleteTask({ task });
		console.log(data);
		if (data.success) {
			toast.success(data.message);
			return;
		}
		if (!data.success) {
			toast.error(data.message);
		}
	};
	return (
		id && (
			<Draggable draggableId={id} index={index}>
				{(provided, snapshot) => (
					<div
						{...provided.dragHandleProps}
						{...provided.draggableProps}
						ref={provided.innerRef}
						className={styles.taskWrapper}
						onClick={() => setShow(!show)}
					>
						<div className={styles.title}>
							<h4>{task?.name}</h4>
							<img
								src={edit}
								alt=""
								onClick={() => setShouldEdit(!shouldEdit)}
								style={{
									backgroundColor: shouldEdit && "#eeeedb",
								}}
							/>
							{shouldEdit && (
								<TaskEditMenu
									currentValues={task}
									updateHandler={updateHandler}
									deleteHandler={deleteHandler}
								/>
							)}
						</div>

						{task?.description && show && (
							<h6>{task?.description}</h6>
						)}
					</div>
				)}
			</Draggable>
		)
	);
};

const TaskEditMenu = ({ currentValues, updateHandler, deleteHandler }) => {
	const [newName, setNewName] = useState(currentValues?.name);
	const [newDescription, setNewDescription] = useState(
		currentValues?.description,
	);
	return (
		<div className={styles.editCard}>
			<input
				className={styles.name}
				value={newName}
				onChange={(e) => setNewName(e.target.value)}
			/>
			<input
				className={styles.name}
				value={newDescription}
				onChange={(e) => setNewDescription(e.target.value)}
				placeholder="Description"
			/>
			<div className={styles.btns}>
				<button
					className={styles.addCardBtn}
					onClick={() => updateHandler({ newName, newDescription })}
				>
					Save
				</button>
				<img
					src={deleteIcon}
					className={styles.deleteIcon}
					onClick={deleteHandler}
				/>
			</div>
		</div>
	);
};
export default Task;
