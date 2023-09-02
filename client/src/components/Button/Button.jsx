import Spinner from "../Spinner/Spinner";
import styles from "./Button.module.scss";

const Button = ({ text, clickhandler, disabled = false, type }) => (
    <button
        type={type}
        disabled={disabled}
        onClick={clickhandler}
        className={styles.btn}
    >
        {disabled ? <Spinner size={"1.1rem"} /> : text}
    </button>
);

export default Button;
