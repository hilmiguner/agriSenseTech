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

async function login(email, password) {
    const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${api_keys.firebaseAPI_KEY}`,
        {
            email: email,
            password: password,
            returnSecureToken: true,
        }
    );
    return response;
}

async function getUserData(token) {
    const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${api_keys.firebaseAPI_KEY}`,
        {
            idToken: token,
        }
    );
    return response;
}

export default {
    createUser,
    login,
    getUserData
}