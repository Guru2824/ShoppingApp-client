const axios = require("axios")

class UserAPI {
    constructor() {

    }

    getAllUsers() {
        const url = "https://shoppingapp-mock.herokuapp.com/api/users";
        return axios.get(url);
    }

    async isValidUser(userDetails) {
        if (userDetails.name == "" || userDetails.name == null) {
            throw new Error("Invalid User Name");
        } else if (userDetails.email == "" || userDetails.email == null) {
            throw new Error("Invalid Email");
        } else if (userDetails.password == null || userDetails.password == "") {
            throw new Error("Invalid Password");
        } else {
            return await userDetails;
        }
    }

    userRole(role) {
        if (!role || role == "USER") {
            return "USER";
        } else {
            return "ADMIN";
        }
    }
    async isUserAlreadyExists(email) {
        let allUserList = await this.getAllUsers();
        let userListData = await allUserList.data
        let isEmailExists = userListData.some(e => e.email == email);
        if (!isEmailExists) {
            return "Vaild";
        } else {
            throw new Error("Email Already Exists");
        }
    }

    async userRegister(userDetails) {
        try {
            let newUser = await this.isValidUser(userDetails);
            let userRole = await this.userRole(userDetails.role);
            newUser.role = userRole;
            let userEmail = await this.isUserAlreadyExists(userDetails.email);
            if (userEmail == "Vaild") {
                const url = "https://shoppingapp-mock.herokuapp.com/api/users";
                return axios.post(url, newUser);
            } else {
                return error;
            }
        } catch (error) {
            return error;
        }
    }

    async getUserDetails(getUserDetails_id) {
        try {
            let allUserList = await this.getAllUsers();
            let userListData = await allUserList.data

            let getuser = userListData.find(u => u.id == getUserDetails_id);
            delete getuser.password;
            return getuser;
        } catch (error) {
            throw new Error("User Id Invaild")
        }
    }



}

exports.UserAPI = UserAPI;