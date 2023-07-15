import {Link, useLocation} from "react-router-dom";
function Navbar(){
    const {pathname} = useLocation()
    return <div className="bg-gray-50 w-[17.5rem] h-screen shrink-0 hidden lg:block shadow-md">
        <div className="w-full text-2xl text-center text-blue-800 border-b border-r h-[3.5rem]">
            <div className="pt-3">
                Billing App
            </div>
        </div>
        <div className="flex flex-col gap-2 mt-14">
            <Link to="/" className={`px-4 py-2 ${pathname==='/'? 'font-bold bg-blue-50' : null }`}>Invoices</Link>
            <Link to={null} className={`px-4 py-2 ${pathname!=='/'? 'font-bold bg-blue-50' : null }`}>...</Link>
        </div>
    </div>
}

export default Navbar
