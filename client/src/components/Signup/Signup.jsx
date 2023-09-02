import { useState } from "react";
import styles from "./Signup.module.scss";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthentication, setUser } from "../../redux/slices/userSlice";
import Button from "../Button/Button";
const Signup = ({ formChangeHandler }) => {
    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setNewUser((previousValue) => ({
            ...previousValue,
            [name]: value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!newUser.email || !newUser.password || !newUser.firstName || !newUser.lastName) {
            toast.error('Enter Required Fields');
            setLoading(false);
            return;
        }


        try {
            const { data } = await api.signup(newUser);
            if (!data?.success) {
                toast.error(data.message);
                setLoading(false);
            } else {
                dispatch(setUser(data.user));
                dispatch(setAuthentication(true));
                toast.success(data.message);
                setLoading(false);
                navigate('/keeper');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.login}>
            <h3>SignUp</h3>
            <form onSubmit={submitHandler}>
                {/* Name */}

                <div className={styles.name}>
                    <div>
                        <label htmlFor="name">
                            FirstName <span>*</span>
                        </label>

                        <input
                            type="text"
                            required
                            name="firstName"
                            id="fName"
                            placeholder="FirstName"
                            onChange={changeHandler}
                            value={newUser.firstName}
                        />
                    </div>
                    <div>
                        <label htmlFor="name">LastName</label>
                        <input
                            type="text"
                            required
                            name="lastName"
                            id="lName"
                            placeholder="LastName"
                            onChange={changeHandler}
                            value={newUser.lastName}
                        />
                    </div>
                </div>

                {/* Email */}

                <label htmlFor="email">
                    Email <span>*</span>
                </label>
                <input
                    required
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={changeHandler}
                    value={newUser.email}
                />

                {/* Password */}

                <label htmlFor="password">
                    Password <span>*</span>
                </label>
                <input
                    required
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={changeHandler}
                    value={newUser.password}
                />

                <p>
                    Already have an Account ?{" "}
                    <span onClick={formChangeHandler}>Login</span>
                </p>

                <Button text={"Signup"} disabled={loading} type={'submit'} />
            </form>
        </div>
    );
};

export default Signup;
