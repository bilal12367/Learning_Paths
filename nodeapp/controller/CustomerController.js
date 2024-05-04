import { CustomerService } from "../service/CustomerService.js";

const customerController = {}

customerController.findCustomer = async (req, res) => {
    const customerId = req.params.customerId;
    const customer = await CustomerService.getCustomer(customerId);
    res.status(200).json(customer)
}

customerController.regCustomer = async (req, res) => {
    let customer = req.body;
    customer = await CustomerService.registerCustomer(customer)
    res.status(201).json(customer)
}

customerController.putCustomer = async (req, res) => {
    let customerId = req.params.customerId;
    let customer = req.body;
    customer = await CustomerService.updateCustomer(customerId, customer)
    res.status(200).json(customer)
}

customerController.delCustomer = async (req, res) => {
    let customerId = req.params.customerid;
    let msg = await CustomerService.deleteCustomer(customerId);

    res.status(200).json(msg)
}

customerController.getAllCustomers = async(req,res) => {
    const customers = await CustomerService.getAllCustomers()
    res.status(200).json(customers);
}

export { customerController }