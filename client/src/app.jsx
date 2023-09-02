import Authentication from "./pages/Authentication/Authentication";
import Home from "./pages/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Keeper from "./pages/Keeper/Keeper";
import Layout from "./AppLayout";
import Error from "./Layouts/Error/Error";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <Home /> },
            {
                path: "auth",
                element: <Authentication />,
            },
            {
                path: "keeper",
                element: <Keeper />,
            },
        ],
        errorElement: <Error />,
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
