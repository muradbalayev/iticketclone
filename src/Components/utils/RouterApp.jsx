import { createBrowserRouter } from "react-router-dom";
import AllEvents from "../Pages/AllEvents";
import EventPage from "../Pages/EventPage";
import App from "../App";
import Cart from "../Pages/Cart";
import Favorites from "../Pages/Favorites";
import Home from "../Pages/Home";


export const RouterApp = createBrowserRouter([
    {
        path: '/*',
        element: <App />,
        children: [
            {
                path: ':language/cart',
                element: <Cart/>
            },
            {
                path: ':language/favorites',
                element: <Favorites/>
            },
            {
                path: ':language/:category',
                element: <EventPage />
            },
            {
                path: ':language',
                element: <AllEvents />
            },
            {
                path: '',
                element: <Home />
            }
        ]
    }
    
]);