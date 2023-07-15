export const getInvoices = async ()=> {
    const resp = await fetch("http://localhost:3001/invoices");
    return await resp.json()
}

export const createInvoice = async (data)=>{
    return fetch("http://localhost:3001/invoice",{
        method:"POST",
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

export const updateInvoiceSentStatus = async (id,status)=>{
    return fetch(`http://localhost:3001/invoice-sent-status/${id}`,{
        method:"PUT",
        body: JSON.stringify({status}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}
