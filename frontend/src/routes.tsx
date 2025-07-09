import Home from './pages/home';
import Edit from './pages/edit';
import { createBrowserRouter } from "react-router-dom";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/edit",
    element: <Edit />,
  },
]);

export default AppRoutes;
