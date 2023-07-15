export const getInvoices = async ()=> {
    const resp = await fetch("https://my-project-7b52d.firebaseio.com/invoices.json");
    return Object.values(await resp.json())
}

export const createInvoice = async (data)=>{
    return fetch("https://my-project-7b52d.firebaseio.com/invoices.json",{
        method:"POST",
        body: {...data},
        headers:{
            'content-type': 'application/json'
        }
    })
}
