import axios from "axios";
import api_keys from "./api_keys";

async function writeData(endpoint, data) {
    const response = await axios.put(api_keys.realtimeDatabaseIp+endpoint, data);
    return response;
}

async function updateData(endpoint, data) {
    const response = await axios.patch(api_keys.realtimeDatabaseIp+endpoint, data);
    return response;
}

async function getData(endpoint) {
    const response = await axios.get(api_keys.realtimeDatabaseIp+endpoint);
    return response;
}

export default {
    writeData,
    updateData,
    getData,
};