import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Header/Home/Home";
import AddBook from "./components/AddBook/AddBook";
import AuthProvider from "./components/contexts/AuthProvider/AuthProvider";
import Login from "./components/Login/Login";

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
      element: <AddBook />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
