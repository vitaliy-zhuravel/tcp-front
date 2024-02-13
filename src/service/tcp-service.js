import axios from 'axios';
const API_URL= process.env.REACT_APP_API_URL
console.log(API_URL)
export const sendData = async (value) => {
    try {
        const response = await axios.post(`${API_URL}tcp-data`, {key: value.text, port: value.port, host: value.host});
        console.log(response.data)
        return response.data; 
    } catch (error) {
        console.error('There was a problem with the axios request:', error);
    }
};

export const getConnectStatus = async () => {
    try {
        const response = await axios.get(`${API_URL}tcp-status`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const disConnect = async () => {
    try {
       const response = await axios.post(`${API_URL}tcp-disconnect`) 
       return response.data
    } catch (error) {
        console.log(error)
    }
}

