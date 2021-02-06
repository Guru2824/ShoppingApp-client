const axios = require("axios")

class ProductAPI {
    constructor() {
    }

    getAllProducts() {
        const url = "https://shoppingapp-mock.herokuapp.com/api/products";
        return axios.get(url);
    }

    getAllBrandName() {
        const url = "https://shoppingapp-mock.herokuapp.com/api/brands";
        return axios.get(url)
    }

    getAllUsers() {
        const url = "https://shoppingapp-mock.herokuapp.com/api/users";
        return axios.get(url);
    }

    sorting(data1, data2) {
        if (data1.price < data2.price) {
            return -1;
        } else if (data1.price > data2.price) {
            return 1;
        } else {
            return 0;
        }
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

            results.sort(this.sorting)

            return results;

        } else {
            return products;
        }

        return products;
    }

    async changeProductStatus(productId, status) {
        let data = { active: status == true ? 1 : 0 };
        const url = "https://shoppingapp-mock.herokuapp.com/api/products/" + productId;
        return await axios.patch(url, data);
    }

    async checkValidProduct(productId, status) {
        try {
            var result = await this.changeProductStatus(productId, status);
        } catch (err) {
            throw new Error("Please enter correct product");
        }
    }

    async isValidProduct(product) {
        if (product.name == "" || product.name == null) {
            throw new Error("Invalid Product Name");
        } else if (product.brandName == "" || product.brandName == null) {
            throw new Error("Invalid BrandName");
        } else if (product.ram == null || product.ram == "") {
            throw new Error("Invalid Ram");
        } else if (product.rating == null || product.rating == "") {
            throw new Error("Invalid Rating");
        } else if (product.price == null || product.price == "") {
            throw new Error("Invalid Price")
        }
        else {
            console.log("Product Added");
            return await product;
        }
    }

    async addProduct(product) {
        try {
            let productDetails = await this.isValidProduct(product);
            // console.log(productDetails)
            if (!productDetails) {
                throw new Error("Error");
            } else {
                // console.log("DATA", productDetails)
                const url = "https://shoppingapp-mock.herokuapp.com/api/products";
                return await axios.post(url, productDetails);
            }
        } catch (error) {
            throw error;
        }

    }

    async getAllActiveProducts() {
        let productsList = await this.getAllProducts();
        let products = productsList.data;

        var activeProducts = products.filter(p => p.active == 1);
        // console.log(activeProducts);
        return activeProducts;
    }


    async getProductDetails(getProductDetails_id) {
        try {
            let productsList = await this.getAllProducts();
            let products = await productsList.data;

            let getProduct = products.find(p => p.id == getProductDetails_id);
            delete getProduct.active;
            return getProduct;
        } catch (error) {
            throw new Error("Product Id Invaild")
        }

    }
}

exports.ProductAPI = ProductAPI;