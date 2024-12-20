import { createBrowserRouter } from "react-router-dom";
import {UserLayout} from '../layout/UserLayout'
import {Home} from '../pages/user/Home'
import {About} from '../pages/user/About'
import {Contact} from '../pages/user/Contact'
import {ProductList} from '../pages/user/PorductList'
import { ProductDetails } from "../pages/user/ProductDeatils";
import {Signup} from '../pages/shared/Signup'
import {Login} from '../pages/shared/Login'
import {ErrorPage} from '../pages/shared/Error'

export const router = createBrowserRouter([
    {
        path: "",
        element: <UserLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: 'signup',
                element: <Signup/>
            },
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'about',
                element: <About/>
            },
            {
                path: 'contact',
                element: <Contact/>
            },
            {
                path: 'products',
                element: <ProductList/>
            },
            {
                path: 'product-details/:id',
                element: <ProductDetails/>
            },
            {
                
            }
        ]
    }
])


