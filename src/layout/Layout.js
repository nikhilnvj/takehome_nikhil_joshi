import {Outlet} from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";
function Layout(){
    return <div className="flex">
        <Navbar />
        <div className="flex flex-col w-full">
            <Header />
            <div className="flex-1 p-4">
                <Outlet/>
            </div>
        </div>
    </div>
}

export default Layout

