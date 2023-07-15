// https://my-project-7b52d.firebaseio.com/invoices.json
import {getInvoices} from "./services/api";
import {useEffect, useMemo, useState} from "react";
import spinner from './assets/spinner.svg'
import Button from "./UI/Button";
import dayjs from "dayjs";
import dayjsPluginUTC from 'dayjs-plugin-utc'
import Modal from "./UI/Modal";
import InvoiceCreateModal from "./components/InvoiceCreateModal";
import Notification from "./UI/Notification";
import InvoiceViewModal from "./components/InvoiceViewModal";

dayjs.extend(dayjsPluginUTC)

function Invoices() {

  const [loading, setLoading] = useState(false)
  const [invoices, setInvoices] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showNotification, setShowNotification]=useState(true)
  const [selectedInvoice, setSelectedInvoice ] = useState(null)
  const loadInvoices = async ()=>{
    try{
        setLoading(true)
        const resp=await getInvoices()
        setInvoices(resp)
    } finally {
        setLoading(false)
    }
  }

  const isInvoicePastDue=(invoice)=>{
    const now =dayjs()
    return now.isAfter(dayjs(invoice.due_date), 'date')
  }

  const isAnyInvoicePastDue = useMemo(()=> Object.values(invoices).some(isInvoicePastDue), [invoices])

  const sendEmail = (invoice)=>{
      window.open(`mailto:test@example.com?subject=Invoice&body=${JSON.stringify(invoice)}`)
  }

  useEffect(()=>{
    loadInvoices()
  }, [])

  return (
   <div className="flex flex-col">
    <div className="mt-6 w-full text-right pb-6">
        <Button title="Create Invoice" onClick={()=> setShowModal(true)} />
    </div>
    {!loading &&
        <div className="mt-10">
            <table className="w-full border border-gray-100 shadow-sm">
                <thead className="group">
                    <tr className="border-b border-gray-100 text-left group-hover:bg-gray-50">
                        <th className="border-r border-gray-100 p-4">Status</th>
                        <th className="border-r border-gray-100 p-4">Due On</th>
                        <th className="border-r border-gray-100 p-4">Sent</th>
                        <th className="border-r border-gray-100 p-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.entries(invoices).map(([id, invoice])=>{
                            return <tr key={id} className={`group cursor-pointer ${isInvoicePastDue(invoice) ? 'bg-red-100': null}`}>
                                    <td className="border-r border-gray-100 p-4 group-hover:bg-gray-50">{invoice.status}</td>
                                    <td className="border-r border-gray-100 p-4 group-hover:bg-gray-50">
                                        {dayjs.utc(invoice.due_date).format("MMM DD, YYYY")}
                                        { isInvoicePastDue(invoice) &&
                                            <span className="ml-2 font-bold text-red-500">
                                                (Overdue)
                                            </span>
                                        }
                                    </td>
                                    <td className="border-r border-gray-100 p-4 group-hover:bg-gray-50">{invoice.sent ? 'Yes' : 'No'}</td>
                                    <td className="border-r border-gray-100 p-4 group-hover:bg-gray-50">
                                        <div className="flex gap-2">
                                            <button
                                                className="border rounded-md p-2 text-xs bg-blue-400 text-white font-bold hover:bg-blue-500"
                                                onClick={()=> setSelectedInvoice(invoice)}>
                                                    View
                                            </button>
                                            <button
                                                className="border rounded-md p-2 text-xs bg-white text-black font-bold hover:bg-gray-100"
                                                onClick={()=> sendEmail(invoice)}
                                                >
                                                Email Invoice
                                            </button>
                                        </div>
                                    </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    }
    {
        loading && <img className="w-20 self-center" src={spinner} alt="loading..." />
    }
       { showModal &&
            <InvoiceCreateModal
                onCreate={()=> { setShowModal(false); loadInvoices()}}
                onClose={()=> setShowModal(false)} />
        }
       { isAnyInvoicePastDue && showNotification &&
            <Notification text="Some invoices are overdue and are highlighted in red below" onClose={()=> setShowNotification(false)} />
       }
       {
        selectedInvoice ? <InvoiceViewModal invoice={selectedInvoice} onClose={()=> setSelectedInvoice(null)} />:null
       }
   </div>
  );
}

export default Invoices;
