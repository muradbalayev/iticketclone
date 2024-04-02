import { createBrowserRouter } from "react-router-dom";
import AllEvents from "../Pages/AllEvents";
import EventPage from "../Pages/EventPage";
import App from "../App";
import Cart from "../Pages/Cart";
import Favorites from "../Pages/Favorites";


export const RouterApp = createBrowserRouter([
    {
        path: '/*',
        element: <App />,
        children: [
            {
                path: '',
                element: <AllEvents />
            },
            {
                path: ':category',
                element: <EventPage />,
            },
            {
                path: 'cart',
                element: <Cart/>
            },
            {
                path: 'favorites',
                element: <Favorites/>
            }
        ]
    }

]);