import { useState, useEffect } from 'react';
import './App.css';
import { sendData, getConnectStatus, disConnect } from './service/tcp-service';


export const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputPort, setInputPort] = useState(3006);
  const [inputHost, setInputHost] = useState('localhost');
  const [responseTCP, setResponseTCP] = useState('');
  const [connect, setConnect] = useState(false);

  const handleSend = async () => {
    const response = await sendData({text: inputValue, port: inputPort, host: inputHost})
    await setResponseTCP(response.value)
    await setConnect(response.isConnect)
  }

  const handleDisConnect = async () => {
      await disConnect()
      const result = await getConnectStatus();
      setConnect(result)
  }

  useEffect(()=>{
    async function fetchStatus () {
      const result = await getConnectStatus();
      setConnect(result)
    }

    fetchStatus();

  }, [])


  return (
    <div className="App">
        <h2>Welcome to the tcp Service!</h2>
        <h4 style={{color: connect ? 'green' : 'red'}}>{connect ? 'Connected' : 'Not connected'}</h4>
        <div className='inputBox'>
          <h4>Send request to the tcp server</h4>
          <input className='input' placeholder='Data to send' type="text" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
          <input className='input' placeholder='Host' type="text" value={inputHost} onChange={(event) => setInputHost(event.target.value)} />
          <input className='input' placeholder='Port' type="text" value={inputPort} onChange={(event) => setInputPort(event.target.value)} />
          <br/>
          <button className='button' onClick={handleSend}>SEND</button>
          <button className='button' onClick={handleDisConnect}>Disconnect</button>
        </div>
        <div className='inputBox'>
          <h4>Response</h4>
          <p>{responseTCP}</p>
        </div>
    </div>
  );
}
