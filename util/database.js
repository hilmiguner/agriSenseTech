import axios from "axios";

async function writeData(url, data) {
    const response = await axios.put(url, data);
    return response;
}

async function getData(url) {
    const response = await axios.get(url);
    return response;
}

export default {
    writeData,
    getData,
};