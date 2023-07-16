const baseUrl="https://invoices-api-0433e822781d.herokuapp.com"

export const getInvoices = async ()=> {    const resp = await fetch(`${baseUrl}/invoices`);
    return await resp.json()
}

export const createInvoice = async (data)=>{
    return fetch(`${baseUrl}/invoice`,{
        method:"POST",
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

export const updateInvoiceSentStatus = async (id,status)=>{
    return fetch(`${baseUrl}/invoice-sent-status/${id}`,{
        method:"PUT",
        body: JSON.stringify({status}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}
