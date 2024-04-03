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
                path: ':language',
                element: <AllEvents />
            },
            {
                path: ':language/:category',
                element: <EventPage />
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