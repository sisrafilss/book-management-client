import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Header/Home/Home";
import AddBook from "./components/AddBook/AddBook";

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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
