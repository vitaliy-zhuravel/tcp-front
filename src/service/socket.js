import React from 'react';
import socketio from "socket.io-client";
const BASE_URL = process.env.REACT_APP_API_URL

export const webSocket = socketio.connect(BASE_URL);
export const SocketContext = React.createContext();