import { useState } from "react";
import styles from "./Login.module.scss";
import api from "../../api/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setAuthentication, setUser as setAuthenticatedUser } from "../../redux/slices/userSlice";
import Button from "../Button/Button";


const Login = ({ formChangeHandler }) => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handler = (e) => {
        const { name, value } = e.target;
        setUser((previousValue) => ({ ...previousValue, [name]: value }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!user.email || !user.password) {
            toast.error('Enter Required Fields');
            setLoading(false);
            return;
        }

        try {
            const { data } = await api.login(user);
            if (!data?.success) {
                toast.error(data.message);
                setLoading(false);
            } else {
                dispatch(setAuthenticatedUser(data.user))
                dispatch(setAuthentication(true));
                setLoading(false);
                toast.success(data.message);
                navigate('/keeper');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.login}>
            <h3>Login</h3>
            <form onSubmit={submitHandler}>
                <label htmlFor="email">
                    Email <span>*</span>
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={handler}
                    value={user.email}
                />

                <label htmlFor="password">
                    Password <span>*</span>
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={handler}
                    value={user.password}
                />

                <p>
                    Don't have an Account ?{" "}
                    <span onClick={formChangeHandler}>SIGNUP</span>
                </p>

                {/* <button type="submit">Login</button> */}
                <Button text={'Login'} disabled={loading} type={'submit'} />
            </form>

        </div>
    );
};

export default Login;
