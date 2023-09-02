import { useState } from "react";
import Login from "../../components/Login/Login";
import Signup from "../../components/Signup/Signup";
import styles from './Authentication.module.scss'

const Authentication = () => {
	const [login, setLogin] = useState(true);

	return (
		<div className={styles.auth}>
			{login ? (
				<Login formChangeHandler={() => setLogin(!login)} />
			) : (
				<Signup formChangeHandler={() => setLogin(!login)} />
			)}
		</div>
	);
};

export default Authentication;
