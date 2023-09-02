import { useEffect } from "react";
import { Outlet, useHref, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import api from "./api/api";
import { setAuthentication, setUser } from "./redux/slices/userSlice";

const Layout = () => {
    const navigate = useNavigate();
    const href = useHref();
    const isAuthenticated = useSelector(slice => slice.user.isAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const { data } = await api.reload();
            dispatch(setUser(data.user));
            dispatch(setAuthentication(data.success));
        })();
    }, []);


    useEffect(() => {
        if (isAuthenticated && href === '/auth') navigate('/keeper');
        if (!isAuthenticated && href === '/keeper') navigate('/auth');
        if (isAuthenticated && href !== '/') navigate('/keeper');

    }, [navigate, href, isAuthenticated]);

    return (
        <div>
            <Navbar />
            <Outlet />
            <Toaster />
        </div>
    );
};

export default Layout;