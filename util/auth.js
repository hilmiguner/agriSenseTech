import axios from "axios";
import api_keys from "./api_keys";

async function createUser(email, password) {
    const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${api_keys.firebaseAPI_KEY}`,
        {
            email: email,
            password: password,
            returnSecureToken: true,
        }
    );
    return response;
}

export default {
    createUser,
}