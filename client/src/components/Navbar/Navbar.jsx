import styles from "./Navbar.module.scss";
import logo from "../../assets/keeperLogo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import profile from "../../assets/home.png";


const Navbar = () => {
    const isAuthenticated = useSelector((slice) => slice.user.isAuthenticated);
    return (
        <div id={styles.navbarWrapper}>
            <div id={styles.left}>
                <img src={logo} alt="logo" />
                <Link to={"/"}>Keeper</Link>
            </div>

            {isAuthenticated && (
                <div id={styles.right}>
                    <img
                        src={profile}
                        className={styles.profile}
                        alt="profile"
                    />
                </div>
            )}
        </div>
    );
};

export default Navbar;
