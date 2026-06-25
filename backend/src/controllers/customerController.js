const Customer = require("../models/Customer");
const Order = require("../models/Orders");

const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);

    res.status(201).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: customer,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCustomer = async (req, res) => {
  try {

    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    const existingOrders = await Order.find({
      customer: req.params.id,
    });

    if (existingOrders.length > 0) {
      return res.status(400).json({
        success: false,
        message:
          "Cannot delete customer because existing orders are linked to this customer.",
      });
    }

    await Customer.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getCustomerProfile = async (req, res) => {
    try {

        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        const orders = await Order.find({
            customer: req.params.id
        })
        .populate("customer")
        .sort({ createdAt: -1 });

        const totalOrders = orders.length;

        const totalSpent = orders.reduce(
            (sum, order) =>
                sum + order.payment.totalAmount,
            0
        );

        const lastOrderDate =
            orders.length > 0
                ? orders[0].createdAt
                : null;

        res.status(200).json({
            success: true,

            customer,

            stats: {
                totalOrders,
                totalSpent,
                lastOrderDate
            },

            orders
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  getCustomerProfile
};