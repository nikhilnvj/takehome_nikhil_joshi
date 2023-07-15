import {createBrowserRouter} from "react-router-dom";
import Layout from "./layout/Layout";
import Invoices from "./Invoices";

export default createBrowserRouter([
    {
        path:'/',
        element: <Layout />,
        children:[
            {
                path: '',
                element: <Invoices />
            }
        ]
    }
])
