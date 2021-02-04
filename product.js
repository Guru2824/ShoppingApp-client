const { ProductAPI } = require("./productApi")
let filters = { brandName: ["Apple", "Samsung", "RealMe"], ram: [3], price: { min: 10000, max: 50000 } };

const productsapi = new ProductAPI();
productsapi.getAllProducts().then(res => {
    console.log(res);
});

productsapi.searchProducts(filters).then(data => {
    console.table(data)
});

// let results = await productsapi.searchProducts(filters)

// console.log(results)
