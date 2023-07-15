import Modal from "../UI/Modal";
import dayjs from "dayjs";
import {useMemo} from "react";

function InvoiceViewModal({onClose, invoice}) {
    const invoiceTotal = useMemo(()=> invoice.items.reduce((acc, inv)=> acc+ (inv.hours * inv.rate), 0),
        [invoice.items])

    return <Modal onClose={onClose} onOk={onClose} title="View Invoice">
        <div className="flex flex-col gap-6">
            <span className="text-lg text-gray-600 font-bold">Line Items</span>
            { invoice.items.length ?
                <div className="flex flex-col gap-2 px-6">
                    <div className="flex gap-3">
                        <div className="flex-1 font-bold text-sm">Hours</div>
                        <div className="flex-1 font-bold text-sm">Rate</div>
                        <div className="flex-1 font-bold text-sm">Description</div>
                        <div className="flex-1 font-bold text-sm">Total</div>
                        <div className="flex-1" />
                    </div>
                    {invoice.items.map((item)=>
                        <div key={item.id} className="flex gap-3 my-2 border-t border-b p-2">
                            <div className="flex-1 text-sm">{item.hours}</div>
                            <div className="flex-1 text-sm">${item.rate}</div>
                            <div className="flex-1 text-sm">{item.description}</div>
                            <div className="flex-1 text-sm">${Number(item.rate*item.hours).toFixed(2)}</div>
                        </div>
                    )}
                </div>
                : null }

                <div className="flex gap-3 items-center px-6">
                    <div className="text-sm font-bold">Status:</div>
                    <div className={`${invoice.status!=='overdue'? 'text-gray-900' : 'text-red-500'}`}>{invoice.status}</div>
                </div>
                <div className="flex gap-3 items-center px-6">
                    <div className="text-sm font-bold">Due Date:</div>
                    <div>{dayjs.utc(invoice.due_date).format("MMM DD, YYYY")}</div>
                </div>
                <div className="flex gap-3 items-center px-6">
                    <div className="text-sm font-bold">Sent:</div>
                    <div>{invoice.sent ? 'Yes' : 'No'}</div>
                </div>
                <div className="flex gap-3 items-center px-6">
                    <div className="text-sm font-bold">Notes:</div>
                    <div>{invoice.notes}</div>
                </div>
                <div className="flex gap-3 items-center px-6">
                    <div className="text-sm font-bold">Invoice Total:</div>
                    <div>${invoiceTotal}</div>
                </div>
        </div>
    </Modal>
}

export default InvoiceViewModal
