import axios from 'axios';
const API_URL= process.env.REACT_APP_API_URL

export const sendData = async (value) => {
    try {
        const response = await axios.post(`${API_URL}tcp-data`, {key: value.text, port: value.port, host: value.host, sessionId: value.sessionId});
        console.log(response.data)
        return response.data; 
    } catch (error) {
        console.error('There was a problem with the axios request:', error);
    }
};

export const getConnectStatus = async (id) => {
    try {
        const response = await axios.get(`${API_URL}tcp-status/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getActiveSockets = async () => {
  try {
    const response = await axios.get(`${API_URL}tcp-data`)
    return response.data
  } catch (error) {
    console.log(error)
  }  
}

export const connectSocket = async (id) => {
    try {
        alert('this endpoint isn`t ready')
    //    const response = await axios.post(`${API_URL}tcp-connect?sessionId=${id}`) 
    //    return response.data
    } catch (error) {
        console.log(error)
    }
}

export const disConnect = async (id) => {
    try {
       const response = await axios.post(`${API_URL}tcp-disconnect?sessionId=${id}`) 
       return response.data
    } catch (error) {
        console.log(error)
    }
}

export const deleteSocket = async(id) => {
    try {
        const response = await axios.delete(`${API_URL}tcp-delete/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

