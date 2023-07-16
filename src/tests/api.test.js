import fetchMock from "jest-fetch-mock";
import {getInvoices, createInvoice, updateInvoiceSentStatus} from "../services/api";

describe('API tests', () => {
    const baseUrl="https://invoices-api-0433e822781d.herokuapp.com"
    beforeAll(()=>{
        fetchMock.enableMocks()
    })

    afterAll(()=>{
        fetchMock.disableMocks()
    })

    it('should fetch invoices', async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            json: ()=> Promise.resolve()
        }));
        await getInvoices()
        expect(fetch).toHaveBeenCalledWith(`${baseUrl}/invoices`);
    });

    it('should create an invoice', async () => {
        const data={invoice:{}}
        await createInvoice(data)
        expect(fetch).toHaveBeenCalledWith(`${baseUrl}/invoice`,{
            body: JSON.stringify(data),
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    });

    it('should update an invoice set status to true', async () => {
        await updateInvoiceSentStatus("inv-id", true)
        expect(fetch).toHaveBeenCalledWith(`${baseUrl}/invoice-sent-status/inv-id`,{
            method:"PUT",
            body: JSON.stringify({status:true}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            });
    });
});
