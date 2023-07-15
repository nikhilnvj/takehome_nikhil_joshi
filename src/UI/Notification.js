import {createPortal} from "react-dom";

function Notification({text='', onClose}){
    return createPortal(
        <div
            className="notification">
            <span className="pr-4">{text}</span>
            <button className="text-sm font-bold text-red-500" onClick={onClose}>X</button>
        </div>, document.getElementById("notifications")
    )
}

export default Notification
