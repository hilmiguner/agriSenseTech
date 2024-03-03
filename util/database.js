import axios from "axios";

async function writeData(url, data) {
    const response = await axios.put(url, data);
    return response;
}

export default {
    writeData,
};