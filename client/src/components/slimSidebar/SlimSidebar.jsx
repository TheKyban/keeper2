import styles from './SlimSidebar.module.scss';
import arrow from "../../assets/arrow.png";

const SlimSidebar = ({closeHandler}) => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.arrow} onClick={closeHandler}>
                <img src={arrow} alt="close" />
            </div>
        </div>
    );
};


export default SlimSidebar;