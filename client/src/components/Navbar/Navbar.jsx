import styles from "./Navbar.module.scss";
import logo from "../../assets/keeperLogo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import profile from "../../assets/home.png";
import logoutIcon from "../../assets/logout.png";
import api from "../../api/api";
import { setAuthentication, setUser } from '../../redux/slices/userSlice';


const Navbar = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((slice) => slice.user.isAuthenticated);
    const logoutController = async () => {
        await api.logout();
        dispatch(setAuthentication(false));
        dispatch(setUser({}));
    };
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
                    <img
                        src={logoutIcon}
                        alt="logout"
                        className={styles.logout}
                        onClick={logoutController}
                    />
                </div>
            )}
        </div>
    );
};

export default Navbar;
