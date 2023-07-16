# Studio Frontend Homework

---
### 🧾 Frontend Hosted at: [Link](https://invoices-ui-nik-41c4522bfaa9.herokuapp.com/)
### 🖥️ Backend Hosted at: [Link](https://invoices-api-0433e822781d.herokuapp.com/invoices)

---

## 📝  The assignment

All the features have been implemented (including the extra credit ones 😎):

 - [x] Create a new invoice
 - [x] Add line items to the invoice. Line items may include hours of work at a certain rate, work-related expenses, materials, labor, etc.
 - [x] Add notes to the invoice, including possibly how to pay it, where to send checks, etc.
 - [x] Send the invoice via email (does not have to actually send emails, but if it does, great!)
 - [x] View invoices including status (paid, outstanding, late, etc.)

#### Extra credit features

 - [x] Add a due date to an invoice
 - [x] View late invoices, or even better, alert when an invoice is late
 - [x] Polish and UX
 - [x] Highly reusable components
 - [x] Tests
 - [x] Hosted and Demoable

---

## 📚  Tech Stack

- Frontend: React 18.x, React Testing Library, Tailwind CSS, Jest, ES6+, Webpack, Babel. (Webpack and Babel config internally managed by React)
- Backend: NodeJS, ExpressJs
- Database: Firebase

---
## ⛓️ Steps to run & test

- Running the frontend:
    ```shell
     npm install
     npm start
    ```

- Run all frontend tests: 
    ```
     npm test
    ```

- Running the backend:
  -  To access the local backend from the frontend, change the URL in the `api.js` file in `src/services` to `http://localhost:3001`
        ```shell
         cd backend-node
         npm install
         node app.js # Starts the server on Port 3001
        ```
    - The following APIs are exposed by the Backend:
      ```
          GET /invoices - Fetches all invoices
          POST /invoice - Creates a new invoice
          PUT /invoice-sent-status/:id - Updates the invoice sent status for the specified id
      ```
---

### 🏛️ Code Structure:
- Frontend: 
  - `invoices.js` - Contains the main Invoices Page
  - `UI` directory contains standalone reusable UI elements
  - `components` directory contains complex components built upon the `UI` components
  - `services/api.js` - API layer to call the backend REST APIs.   

---

### ⏳ Development Time: ~7hrs

--- 

### 🤔 Approach:

- Sketch out a rough design of the UI on a piece of paper
- Identify primary components needed: Button, Input, Modal etc.
- Start building standalone components first, then build on top of them to make complex pages.
- Expose appropriate API endpoints for the Frontend to use to fetch/create invoices.
- Setup a firebase DB to store the invoices and access them easily through the Firebase REST API.
---

### ⍻ Potential Improvements for Production-grade code:
- Allow Editing invoices.
- Multi-currency support.
- Integrate Payment providers like Stripe to accept payments.
- Automatically change Invoice status after the due-date.
