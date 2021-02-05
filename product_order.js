const axios = require("axios")


class ProductOrder {
    constructor() {

    }

    async  getProduct(productId) {
        const url = "https://shoppingapp-mock.herokuapp.com/api/products/" + productId;
        return axios.get(url);
    }

    async getUser(id) {
        const url = "http://shoppingapp-mock.herokuapp.com/api/users/" + id;
        return axios.get(url);
    }

    async validCheck(orderDetails) {
        var errors = [];
        try {
            var user = await this.getUser(orderDetails.userId);
        } catch (err) {
            console.log(err.message);
            errors.push("Invalid UserID");
        }
        try {
            var product = await this.getProduct(orderDetails.productId);

        } catch (err) {
            errors.push("Invalid ProductID");
        }

        if (orderDetails.qty <= 0) {
            errors.push("Please enter Qty");
        }

        if (errors.length > 0) {
            throw new Error(errors.join(","));
        }

    }

    async productOrders(orderDetails) {

        try {
            await this.validCheck(orderDetails);
            orderDetails.status = "ORDERED";
            orderDetails.orderedDate = new Date().toJSON();
            const url = "https://shoppingapp-mock.herokuapp.com/api/orders";
            return axios.post(url, orderDetails);
        } catch (err) {
            console.log(err.message);
            throw err;
        }
    }
    async cancelStatus(orderId) {
        const url = "https://shoppingapp-mock.herokuapp.com/api/orders/" + orderId;
        return axios.patch(url, { status: "CANCELLED", cancelledDate: new Date().toJSON() });
    }

    async orderCancel(orderId) {
        try {
            var result = await this.cancelStatus(orderId);
        } catch (err) {
            throw new Error("Please choose valid orderId");
        }

    }

    // getAllUsers() {
    //     const url = "https://shoppingapp-mock.herokuapp.com/api/users";
    //     return axios.get(url);
    // }

    // getAllProducts() {
    //     const url = "https://shoppingapp-mock.herokuapp.com/api/products";
    //     return axios.get(url);
    // }

    // // AllOrders(orders) {
    // //     const url = "https://shoppingapp-mock.herokuapp.com/api/orders";
    // //     return axios.post(url, orders);
    // // }

    // async productOrders(orders) {
    //     let users = await this.getAllUsers();
    //     let user = users.data;
    //     let productsResults = await this.getAllProducts();
    //     let products = productsResults.data;
    //     let order_items = user.some(u => u.id == orders.userId && (products.some(p => p.id == orders.productId)));
    //     if (!order_items) {
    //         throw new Error("Error");
    //     } else {
    //         orders.orderedDate = new Date().toString();
    //         console.log("ORDERED SUCCESSFULLY");
    //         const url = "https://shoppingapp-mock.herokuapp.com/api/orders";
    //         return axios.post(url, orders);
    //     }
    // }

}

exports.ProductOrder = ProductOrder;