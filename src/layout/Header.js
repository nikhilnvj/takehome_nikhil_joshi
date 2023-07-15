import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

const titles ={
    '/': "Invoices"
}
function Header(){
    const {pathname} = useLocation()
    const [title, setTitle] = useState('')

    useEffect(()=>{
       document.title=titles[pathname]
       setTitle(titles[pathname])
    }, [pathname])

    return <div className="bg-gray-50 min-w-full py-3 px-5 h-[3.5rem] shadow-md">
        <div className="flex justify-between items-center">
            <span className="text-xl font-bold">{title}</span>
            <div className="flex gap-2 items-center">
                <div className="bg-amber-300 rounded-full h-8 w-8 flex items-center justify-center text-white font-bold text-[0.875rem]">
                    NJ
                </div>
                <div className="flex flex-col">
                    <div className="text-[0.875rem] font-bold">Nikhil Joshi</div>
                    <div className="text-[#61748F] text-xs font-normal">nikhil@example.com</div>
                </div>
            </div>
        </div>
    </div>
}

export default Header
