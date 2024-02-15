import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import { SocketContext, webSocket } from './service/socket'
import { App } from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <SocketContext.Provider value={webSocket}> */}
      <App />
    {/* </SocketContext.Provider> */}
  </React.StrictMode>
);
