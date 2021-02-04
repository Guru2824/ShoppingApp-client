const axios = require("axios")

class ProductAPI {
    constructor() {
    }

    getAllProducts() {
        const url = "https://shoppingapp-mock.herokuapp.com/api/products";
        return axios.get(url);
    }

    async searchProducts(filters) {
        let productsResults = await this.getAllProducts();
        let products = productsResults.data

        // let results = products;
        //todo:logic
        var results = [];
        let brandName_str = filters.brandName;
        let ram_str = filters.ram;
        let price_str = filters.price;

        if (Object.keys(filters).length != 0) {
            results = products.filter(p => !filters.hasOwnProperty("brandName") || brandName_str.length == 0 || brandName_str.includes(p.brandName));
            results = results.filter(p => !filters.hasOwnProperty("ram") || ram_str.length == 0 || ram_str.includes(p.ram));
            results = results.filter(p => !filters.hasOwnProperty("price") || p.price >= price_str.min && p.price <= price_str.max);

            return results;

        } else {
            return products;
        }

        return products;
    }
}

exports.ProductAPI = ProductAPI;