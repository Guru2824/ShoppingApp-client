const { ProductAPI } = require("./productApi")
let filters = { brandName: ["Apple", "Samsung", "RealMe"], ram: [4.5], price: { min: 10000, max: 50000 } };

const productsapi = new ProductAPI();
productsapi.getAllProducts().then(res => {
    // console.log(res.data)
    return res.data;
});

productsapi.searchProducts(filters).then(data => {
    // console.table(data)
    return data;
});

productsapi.getAllBrandName().then(res => {
    // console.log(res.data)
    return res.data;
})

// let results = await productsapi.searchProducts(filters)

// console.log(results)
