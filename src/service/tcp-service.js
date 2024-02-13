import axios from 'axios';
    
export const sendData = async (value) => {
    try {
        const response = await axios.post('http://localhost:3333/api/tcp-data', {key: value.text, port: value.port, host: value.host});
        return response.data; 
    } catch (error) {
        console.error('There was a problem with the axios request:', error);
    }
};

export const getConnectStatus = async () => {
    try {
        const response = await axios.get('http://localhost:3333/api/tcp-status')
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const disConnect = async () => {
    try {
       const response = await axios.post('http://localhost:3333/api/tcp-disconnect') 
       return response.data
    } catch (error) {
        console.log(error)
    }
}

