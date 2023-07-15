// https://my-project-7b52d.firebaseio.com/invoices.json
import {getInvoices} from "./services/api";
import {useEffect, useState} from "react";
import spinner from './assets/spinner.svg'
import Button from "./UI/Button";
import dayjs from "dayjs";
import dayjsPluginUTC from 'dayjs-plugin-utc'
import Modal from "./UI/Modal";
import InvoiceCreateModal from "./components/InvoiceCreateModal";

dayjs.extend(dayjsPluginUTC)

function Invoices() {

  const [loading, setLoading] = useState(false)
  const [invoices, setInvoices] = useState([])
  const [showModal, setShowModal] = useState(false)
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
                <tbody className="group">
                    {
                        Object.entries(invoices).map(([id, invoice])=>{
                            return <tr key={id} className={`group-hover:bg-gray-50 cursor-pointer ${isInvoicePastDue(invoice) ? 'bg-red-100': null}`}>
                                    <td className="border-r border-gray-100 p-4 group-hover:bg-gray-50">{invoice.status}</td>
                                    <td className="border-r border-gray-100 p-4">
                                        {dayjs.utc(invoice.due_date).format("MMM DD, YYYY")}
                                        { isInvoicePastDue(invoice) &&
                                            <span className="ml-2 font-bold text-red-500">
                                                (Overdue)
                                            </span>
                                        }
                                    </td>
                                    <td className="border-r border-gray-100 p-4">{invoice.sent ? 'Yes' : 'No'}</td>
                                    <td className="border-r border-gray-100 p-4">-</td>
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
   </div>
  );
}

export default Invoices;
