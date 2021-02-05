const axios = require("axios")

class authUserAPI {
    constructor() {
    }

    getAllUsers() {
        const url = "https://shoppingapp-mock.herokuapp.com/api/users";
        return axios.get(url);
    }


    userRole(role) {
        if (!role || role == "USER") {
            return "USER";
        } else {
            return "ADMIN";
        }
    }

    async userLogin(email, password, role) {
        try {
            let defaultUsers = await this.getAllUsers();
            let allUser = defaultUsers.data
            let user = await this.userRole(role)
            let userlogin = allUser.find(u => u.email == email && u.password == password && u.role == user);
            if (!userlogin) {
                throw new Error("Invalid user details")
            } else {
                return userlogin;
            }
        } catch (error) {
            // console.log(error.message)
            throw error;
        }
    }

}

exports.authUserAPI = authUserAPI;