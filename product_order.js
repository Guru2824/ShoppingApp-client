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

    async getAllOrders() {
        const url = "https://shoppingapp-mock.herokuapp.com/api/orders";
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


    async validOrderStatusForCancellation(orderId) {
        const url = "https://shoppingapp-mock.herokuapp.com/api/orders/" + orderId;
        var result = await axios.get(url);
        var orderList = result.data;
        if (orderList.status == "CANCELLED") {
            throw new Error("Already Order has been Cancelled");
        } else if (orderList.status == "DELIVERED") {
            throw new Error("Delivered Product cannot be cancelled");
        }
    }


    async orderCancel(orderId) {
        try {
            await this.validOrderStatusForCancellation(orderId);
            var result = await this.cancelStatus(orderId);
        } catch (error) {
            throw error;
        }

    }

    async validUser(userId) {
        try {
            var usersList = await this.getUser(userId);
        } catch (err) {
            throw new Error("Please check userID");
        }
    }

    async myOrders(userId) {
        try {
            var userOrders = await this.validUser(userId);
            var Allorders = await this.getAllOrders();
            var orders = Allorders.data;
            var myOrders = orders.filter(o => o.userId == userId);
            return myOrders;
        } catch (err) {
            throw err;
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