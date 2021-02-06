const { ProductAPI } = require("./productApi");
const { authUserAPI } = require("./auth_User_API");
const { ProductOrder } = require("./product_order");
const { UserAPI } = require("./user_Api");

const productsapi = new ProductAPI();

const userapi = new authUserAPI();

const orderapi = new ProductOrder();

const userDetailsapi = new UserAPI();



var filters = { brandName: ["Apple", "Samsung", "RealMe"], ram: [4.5], price: { min: 10000, max: 50000 } };

var email = "suresh@gmail.com"; var password = "pass123"; var role = "";

product = {
    name: "Motorola G9",
    brandName: "Motorola",
    ram: 5,
    rating: 4,
    price: 15000,
    active: 1
}

userDetails = {
    name: "bala",
    email: "bala@gmail.com",
    password: "pass123",
    role: ""
}

var orderDetails = { productId: 2, userId: 2, qty: 1 };


// List All Products
productsapi.getAllProducts().then(res => {
    // console.log(res.data)
    return res.data;
});

// Filter Products
productsapi.searchProducts(filters).then(res => {
    // console.table(data)
    return res;
});


// List All Brands
productsapi.getAllBrandName().then(res => {
    // console.log(res.data)
    return res.data;
});


// User Login
userapi.userLogin(email, password, role).then(res => {
    // console.log(res)
    return res;
});


// User Register
userDetailsapi.userRegister(userDetails).then(res => {
    // console.log(res)
    return res;
});


// To Get User Details
// var getUserDetails_id = 4;
// userDetailsapi.getUserDetails(getUserDetails_id).then(res => {
//     // console.log(res);
//     return res;
// })



// To Get Product Details
// var getProductDetails_id = 2;
// productsapi.getProductDetails(getProductDetails_id).then(res => {
//     // console.log(res);
//     return res;
// })



// To Place An New Order
// orderapi.productOrders(orderDetails).then(res => {
//     // console.log(res.data);
//     return res.data;
// })



// To Cancel Order
// var cancelOrderId = 4;
// orderapi.orderCancel(cancelOrderId).then(res => {
//     return "Order Cancelled Successfully";
// });


// To Active InActive Products
// var orderId = 2;
// var status = true;
// productsapi.checkValidProduct(orderId, status).then(res => {
//     // console.log(res)
//     return res;
// });



// To Add New Products
// productsapi.addProduct(product).then(res => {
//     // console.log(res.data);
//     return "Product Added";
// });



// List Active Products
// productsapi.getAllActiveProducts().then(res => {
//     // console.log(res.data);
//     return res;
// });



// To Get My Order List
// var userId = 2;
// orderapi.myOrders(userId).then(res => {
//     return res;
// });


// let results = await productsapi.searchProducts(filters)

// console.log(results)
