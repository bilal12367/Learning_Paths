import Customer from '../models/Customer.js'
import 'express-async-errors'
const CustomerService = {}
CustomerService.getCustomer = async (customerId) => {
    const customer = await Customer.findById(customerId);
    return customer;
}

CustomerService.registerCustomer = async (customer) => {
    const regCustomer = await Customer.create({
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        city: customer.city,
        address: customer.address,
        zipCode: customer.zipCode,
        phoneNumber: customer.phoneNumber,
        state: customer.state
    })
    return regCustomer._id;
}

CustomerService.updateCustomer = async (customerId, customer) => {
    if (await Customer.exists({ _id: customerId })) {
        const updatedCustomer = await Customer.updateOne({ _id: customerId }, customer)
        return updatedCustomer;
    } else {
        throw new Error("Customer not found!!")
    }
}

CustomerService.deleteCustomer = async (customerId) => {
    await Customer.deleteOne(customerId)
    return "Successfully Deleted"
}

CustomerService.getAllCustomers = async() => {
    const customers = await Customer.find({})
    console.log("Resp: ", customers)
    return customers;
}

export { CustomerService }