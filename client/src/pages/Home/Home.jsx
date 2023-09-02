import styles from "./Home.module.scss";
import Text from "../../components/AnimatedText/Text";
import icon from "../../assets/student.png";
import { Link } from "react-router-dom";

const Home = () => {
	return (
			<div id={styles.home}>
				<div id={styles.left}>
					<Text text={"Keeper"} />
					<p>
						Manage your daily tasks and work flow in a modern way!!
					</p>
					<button>
						<Link to={"/auth"}>Start Writting...</Link>
					</button>
				</div>
				<div id={styles.right}>
					<img src={icon} alt="Student" />
				</div>
		</div>
	);
};

export default Home;
