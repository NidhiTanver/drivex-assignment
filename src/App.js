import "./App.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Register from "./pages/register/Register.component";
import ItemList from "./pages/ItemList/ItemList.component";
import ItemDetails from "./pages/ItemDetails/ItemDetails.component";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const ProtectedRoute = ({ children }) => {
    if (localStorage.getItem("drivex-user-data")) {
      return children;
    } else {
      <Navigate to="/register" replace />;
    }
  };
  const router = createBrowserRouter([
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute>
          <Register view="profile" />
        </ProtectedRoute>
      ),
    },
    {
      path: "/items/:page",
      element: (
        <ProtectedRoute>
          <ItemList />
        </ProtectedRoute>
      ),
    },
    {
      path: "/item/:id",
      element: (
        <ProtectedRoute>
          <ItemDetails />
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <Navigate to="/register" replace />,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
