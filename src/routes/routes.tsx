import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Notes from "../pages/Notes/Notes";
import PrivateRoute from "./privateRoute";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <SignUp />
            },
            {
                path: '/notes',
                element: <PrivateRoute><Notes /></PrivateRoute>
            }
        ]
    }
])

export default routes