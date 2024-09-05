import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Create from "./pages/Create";
import User from "./pages/UserContent";
import Charts from "./pages/Charts";

const router = createBrowserRouter([
  { 
    path: "/", 
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "create", element: <Create /> },
      { path: "user/:id", element: <User /> },
      { path: "charts", element: <Charts /> },
    ]
  }
])

export default router