export const getInvoices = async ()=> {
    const resp = await fetch("https://my-project-7b52d.firebaseio.com/invoices.json");
    return await resp.json()
}

export const createInvoice = async (data)=>{
    return fetch("https://my-project-7b52d.firebaseio.com/invoices.json",{
        method:"POST",
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

export const updateInvoiceSentStatus = async (id,status)=>{
    return fetch(`https://my-project-7b52d.firebaseio.com/invoices/${id}/sent.json`,{
        method:"PUT",
        body: status,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}
