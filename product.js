const { ProductAPI } = require("./productApi");
const { authUserAPI } = require("./auth_User_API");
const { ProductOrder } = require("./product_order");

let filters = { brandName: ["Apple", "Samsung", "RealMe"], ram: [4.5], price: { min: 10000, max: 50000 } };
// let users = { email: "admin@gmail.com", password: "pass123" };
var email = "suresh@gmail.com"; var password = "pass123"; var role = "";


let orderDetails = { productId: 2, userId: 3, qty: 1 };

const productsapi = new ProductAPI();

const userapi = new authUserAPI();

const orderapi = new ProductOrder();

productsapi.getAllProducts().then(res => {
    // console.log(res.data)
    return res.data;
});

productsapi.searchProducts(filters).then(res => {
    // console.table(data)
    return res;
});

productsapi.getAllBrandName().then(res => {
    // console.log(res.data)
    return res.data;
});

userapi.userLogin(email, password, role).then(res => {
    // console.log(res)
    return res;
});

orderapi.productOrders(orderDetails).then(res => {
    // console.log(res.data);
    return res.data;
})

var cancelOrderId = 10;
orderapi.orderCancel(cancelOrderId).then(res => {
    return "Order Cancelled Successfully";
});

var orderId = 1;
var status = false;
productsapi.checkValidProduct(orderId, status).then(res => {
    console.log(res)
    return res;
}).catch(err => {
    throw err;
});

// let results = await productsapi.searchProducts(filters)

// console.log(results)
