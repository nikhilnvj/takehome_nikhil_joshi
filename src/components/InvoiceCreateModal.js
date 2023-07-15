import Modal from "../UI/Modal";
import DatePicker from "react-datepicker";
import {useMemo, useReducer, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import dayjs from "dayjs";
import * as  api from '../services/api'


const initialInvoice = {
    due_date: null,
    items: [],
    notes: '',
    sent: false,
    status: "outstanding"
}

function reducer(state,action){
    if(action.type==="add_line_item"){
        return {
            ...state,
            items:[
                ...state.items,
                action.payload
            ]
        }
    } else if(action.type==="set_status"){
        return {
            ...state,
            status: action.value
        }
    } else if(action.type==="set_notes"){
        return {
            ...state,
            notes: action.value
        }
    }else if(action.type==="set_due_date"){
        return {
            ...state,
            due_date: action.value
        }
    } else if(action.type==="remove_line_item"){
        return {
            ...state,
            items:[
                ...state.items.filter((item)=> item.id!==action.id)
            ]
        }
    }
    return state
}
function InvoiceCreateModal({onCreate, ...props}) {
    const [invoice, dispatch] = useReducer(reducer, initialInvoice)
    const [creating, setCreating] = useState(false)
    const [lineItem, setLineItem]=useState({
        hours: '',
        rate: '',
        description: ''
    })
    const addLineItem = ()=>{
        const {hours,rate,description} = lineItem
        if(!hours||!rate||!description){
            return
        }
        dispatch({ type: 'add_line_item', payload:{id: uuidv4(), ...lineItem} })
        setLineItem({
            hours: '',
            rate: '',
            description: ''
        })
    }

    const createDisabled = useMemo(()=> !invoice.items.length || !invoice.due_date, [invoice.items.length, invoice.due_date])
    const invoiceTotal = useMemo(()=> invoice.items.reduce((acc, inv)=> acc+ (inv.hours * inv.rate), 0),
     [invoice.items])
    const onInputChange =(name, value)=>{
        setLineItem(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const createInvoice = async ()=>{
        if(createDisabled){
            return
        }

        const data={
            ...invoice,
            due_date: dayjs(invoice.due_date).toISOString()
        }

        try {
            setCreating(true)
            await api.createInvoice(data)
            onCreate()
        } finally {
            setCreating(false)
        }
    }

    return <Modal
            title="Create new Invoice"
            busy={creating}
            okButtonText="Create" {...props}
            okDisabled={createDisabled}
            onOk={createInvoice}>
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
                                <button
                                    className="text-red-500 flex-1 text-sm font-bold cursor-pointer"
                                    onClick={()=> dispatch({type: "remove_line_item", id: item.id})}>X</button>
                            </div>
                        )}
                    </div>
                    : null }
                <div className="flex items-center gap-4">
                    <div className="flex gap-1 items-center">
                        <label htmlFor="hours" className="text-xs font-bold mr-6">Hours {!invoice.items.length ? <sup className="text-red-500 font-bold">*</sup> : null}:</label>
                        <input
                            value={lineItem.hours}
                            onChange={event => onInputChange("hours", event.target.value)}
                            type="number"
                            name="hours"
                            className="border-2 border-blue-100 rounded-md w-20 shadow-sm pl-2"
                            min={1}/>
                    </div>
                    <div className="flex gap-1 items-center">
                        <label htmlFor="rate" className="text-xs font-bold">
                            Rate {!invoice.items.length ? <sup className="text-red-500 font-bold">*</sup> : null}:
                        </label>
                        <input
                            value={lineItem.rate}
                            onChange={event => onInputChange("rate", event.target.value)}
                            type="number"
                            name="rate"
                            className="border-2 border-blue-100 rounded-md w-20 shadow-sm pl-2"
                            min={1}/>
                    </div>
                    <div className="flex flex-1 gap-1 items-center">
                        <label htmlFor="description" className="text-xs font-bold">Description {!invoice.items.length ? <sup className="text-red-500 font-bold">*</sup> : null}:</label>
                        <input
                            value={lineItem.description}
                            onChange={event => onInputChange("description", event.target.value)}
                            type="text"
                            name="description"
                            className="border-2 border-blue-100 rounded-md flex-1 shadow-sm pl-2"
                            min={1}/>
                    </div>
                    <button
                        disabled={!lineItem.rate || !lineItem.hours || !lineItem.description}
                        onClick={addLineItem}
                        className="text-green-600 font-extrabold text-2xl cursor-pointer disabled:text-gray-900 disabled:cursor-not-allowed">
                        +
                    </button>
                </div>
                <div className="flex flex-1 gap-1 items-center mt-4">
                    <label htmlFor="description" className="text-xs font-bold mr-6">Status:</label>
                    <select
                        value={invoice.status}
                        onChange={(event)=> dispatch({type:'set_status', value: event.target.value})}
                        name="status"
                        className="w-40 border-2 border-blue-100 rounded-md text-sm text-gray-900">
                            <option value="paid">Paid</option>
                            <option value="outstanding">Outstanding</option>
                            <option value="overdue">Overdue</option>
                    </select>
                </div>
               <div className="flex gap-1 items-center">
                   <label htmlFor="notes" className="text-xs font-bold mr-8">Notes:</label>
                   <textarea
                        value={invoice.notes}
                        onChange={(event)=> dispatch({type:'set_notes', value: event.target.value})}
                        name="notes"
                        className="mt-4 border-2 border-blue-100 rounded-md flex-1 shadow-sm pl-2">
                    </textarea>
               </div>
                <div className="flex gap-1 items-center mt-4">
                    <label htmlFor="notes" className="text-xs font-bold mr-1">Due Date <sup className="text-red-500 font-bold">*</sup> :</label>
                    <DatePicker
                        className="border-2  border-blue-100 p-2 rounded-md"
                        selected={invoice.due_date}
                        dateFormat='MM/dd/yyyy'
                        onChange={(date) => dispatch({type:'set_due_date', value: date})} />
                </div>
                <div className="mt-4 self-end">
                    <span className="text-lg font-bold pr-4">Total:</span>
                    <span className="text-base">${Number(invoiceTotal).toFixed(2)}</span>
                </div>
            </div>
    </Modal>
}

export default InvoiceCreateModal
