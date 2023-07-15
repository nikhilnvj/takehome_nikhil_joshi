import {createPortal} from "react-dom";
import Button from "./Button";

function Modal({title, okButtonText, children, onClose, onOk, busy=false, okDisabled=false}){
    return createPortal(
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-[40rem] items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div
                            className="relative flex flex-col transform overflow-y-auto rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl min-h-[40rem]">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                        <h3 className="text-2xl font-semibold leading-6 text-gray-900"
                                            id="modal-title">{title}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                { children }
                            </div>
                            <div className="px-4 py-3 sm:flex sm:flex-row-reverse items-end flex-1">
                                <div className="sm:flex sm:flex-row-reverse flex-1 mb-4">
                                    <button onClick={onClose}
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 sm:ml-3 sm:w-auto">
                                            Close
                                    </button>
                                    <Button onClick={onOk}
                                            disabled={okDisabled}
                                            busy={busy}
                                            title={okButtonText || 'OK'}
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md
                                                       px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    ,document.getElementById("modals"))
}

export default Modal
