import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Header/Home/Home";
import AddBook from "./components/AddBook/AddBook";
import AuthProvider from "./components/contexts/AuthProvider/AuthProvider";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import MakeAdmin from "./components/MakeAdmin/MakeAdmin";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/add-book",
      element: (
        <PrivateRoute>
          <AddBook />
        </PrivateRoute>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/make-admin",
      element: (
        <PrivateRoute>
          <MakeAdmin />
        </PrivateRoute>
      ),
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
