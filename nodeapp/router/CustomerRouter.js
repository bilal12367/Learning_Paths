import { Router } from "express";
import { customerController } from "../controller/CustomerController.js";

const customerRouter = Router()

customerRouter.get("/customer/all", customerController.getAllCustomers)
customerRouter.get("/customer/:customerId", customerController.findCustomer)
customerRouter.post("/customer", customerController.regCustomer)
customerRouter.put("/customer/:customerId", customerController.putCustomer)
customerRouter.delete("/customer/:customerId", customerController.delCustomer)

export { customerRouter }