import { Draggable } from "react-beautiful-dnd";
import styles from "./Task.module.scss";
import edit from "../../assets/edit.png";
import { useState } from "react";


const Task = ({ index, task }) => {
	const [show, setShow] = useState(false);
	const { _id: id } = task;
	return (
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
						<img src={edit} alt="" />
					</div>

					{task?.description && show && <h6>{task?.description}</h6>}
				</div>
			)}
		</Draggable>
	);
};

export default Task;
