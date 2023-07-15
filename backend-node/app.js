import express from 'express'

const app=express()
app.use(express.json())

app.get('/invoices', async (req,res)=>{
    const resp = await fetch("https://my-project-7b52d.firebaseio.com/invoices.json");
    res.send(await resp.json())
})

app.post('/invoice', async (req,res)=>{
    // https://my-project-7b52d.firebaseio.com/invoices.json
    await fetch("https://my-project-7b52d.firebaseio.com/invoices.json",{
        method:"POST",
        body: req.body,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    res.status(201).send()
})

app.put('/invoice-sent-status/:id', async (req, res)=>{
    await fetch(`https://my-project-7b52d.firebaseio.com/invoices/${req.params.id}/sent.json`,{
        method:"PUT",
        body: JSON.stringify(req.body.status),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    res.status(200).send()
})

app.listen(3001, ()=>{
    console.log('Server started on port 3001')
})
