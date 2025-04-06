import userModel from "../models/user.model.js";

async function createUser({firstname, lastname, email, password}) {
    if(!firstname || !email || !password) {
        throw new Error("First name, email, and password are required fields");
    }

    const user = userModel.create({
        fullname:{
            firstname,
            lastname,
        },
        email,
        password
    });

    return user;
}

export default {
    createUser
};