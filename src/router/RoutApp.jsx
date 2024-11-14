import { Route, Routes } from "react-router-dom";
import AddPage from "../pages/AddPage";
import Chat from "../pages/Chat";
import HomePage from "../pages/HomePage";
import Problems from "../pages/Problems";

const router = [
    {
        path: '/',
        component: <HomePage/>
    },
    {
        path: '/add',
        component: <AddPage/>
    },
    {
        path: '/chat',
        component: <Chat/>
    },
    {
        path: '/problems',
        component: <Problems/>
    }
];

const RoutApp = () => {
  return (
    <Routes>
        {router.map((el, index) => (
            <Route path={el.path} element={el.component} key={index} />
        ))}
    </Routes>
  );
}

export default RoutApp;
