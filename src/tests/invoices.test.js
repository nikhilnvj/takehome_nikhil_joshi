import {render, screen, waitFor} from "@testing-library/react";
import Invoices from "../Invoices";
import {getInvoices} from "../services/api";
jest.mock('../services/api', ()=>{
    return {
        __esModule: true,
        getInvoices: jest.fn()
    }
})

const mocked={
    "-N_PuSEDtPS_KRmAk3nm": {
        "due_date": "2023-07-12T07:00:00.000Z",
        "items": [
            {
                "description": "some work",
                "hours": "2",
                "id": "92254f37-543f-428b-8b16-debd29f74f97",
                "rate": "100"
            }
        ],
        "notes": "overdue invoice",
        "sent": false,
        "status": "overdue"
    },
    "-N_PxuYMMZzKxhrGRuOi": {
        "due_date": "2023-08-31T07:00:00.000Z",
        "items": [
            {
                "description": "Plumbing",
                "hours": "5",
                "id": "3f294a27-eb8a-45cd-8081-7ec2bf29386e",
                "rate": "50"
            },
            {
                "description": "Electrical wiring",
                "hours": "10",
                "id": "d36b2e7c-923a-471e-bf72-8a1873753f3e",
                "rate": "85"
            },
            {
                "description": "Cleaning",
                "hours": "20",
                "id": "e6b9c8c3-d8eb-4250-9334-514b99ff4f67",
                "rate": "35"
            }
        ],
        "notes": "Payable via e-transfer",
        "sent": false,
        "status": "outstanding"
    }
}
describe('Invoices Test', () => {
    it('should render invoices in the list', async () => {
        const portalElement = document.createElement("div")
        portalElement.id="notifications"
        document.body.appendChild(portalElement)
        getInvoices.mockImplementationOnce(()=> Promise.resolve(mocked))
        render(<Invoices />)
        expect(getInvoices).toHaveBeenCalled()
        await waitFor(()=>{
            screen.queryByTestId("table")
        })

        const rows = screen.getAllByTestId("invoice-rows")
        expect(rows.length).toBe(2)
    });
});
