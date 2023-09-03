import { useState } from 'react';
import styles from './EditMenu.module.scss';
import deleteIcon from '../../assets/delete.png';

const EditMenu = ({
    currentName,
    updateHandler,
    deleteHandler,
    style
}) => {
    const [newName, setNewName] = useState(currentName);
    return (
        <div className={styles.editCard} style={style}>
            <input
                className={styles.name}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
            />
            <div className={styles.btns}>
                <button
                    className={styles.addCardBtn}
                    onClick={() =>
                        updateHandler(newName, currentName)
                    }
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

export default EditMenu;