import { useState, useEffect } from 'react';
import './App.css';
import { 
  sendData, 
  disConnect, 
  getActiveSockets, 
} from './service/tcp-service';
// import { SocketContext } from './service/socket'



export const App = () => {
  // const socket = useContext(SocketContext);
  const [inputValue, setInputValue] = useState('');
  const [inputPort, setInputPort] = useState(3006);
  const [inputHost, setInputHost] = useState('localhost');
  const [response, setResponse] = useState({value: '', sessionId: ''});
  const [sockets, setSockets] = useState([])
  const [isReady, setIsReady] = useState(false)

  const handleSend = async (sessionId) => {
    const response = await sendData({text: inputValue, port: inputPort, host: inputHost, sessionId})
    console.log('response --->', response)
    await setResponse({value: response.value, sessionId: response.sessionId})
  }

  const handleDisConnect = async (id) => {
      await disConnect(id)
      setIsReady(!isReady)
  }

  // useEffect(() => {
  //   console.log('it`s socket!')
  // }, [socket])

  useEffect(() => {
    async function fetchSockets () {
      const socketsResult = await getActiveSockets();
      await setSockets(socketsResult)
    }

    fetchSockets()
  },[response, isReady])

  console.log('active sockets --->', sockets)
  return (
    <>
    <div className="App">
      <h2>Welcome to the tcp Service!</h2>
      <div className='inputBox'>
        <h4>Send request to the tcp server</h4>
        <input className='input' placeholder='Data to send' type="text" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
        <input className='input' placeholder='Host' type="text" value={inputHost} onChange={(event) => setInputHost(event.target.value)} />
        <input className='input' placeholder='Port' type="text" value={inputPort} onChange={(event) => setInputPort(event.target.value)} />
        <br />
        <button className='button' onClick={() => handleSend('no')}>SEND</button>

        <div className='inputBox response'>
          {sockets && sockets.map((socket) => (
            <div key={socket.sessionId}>
              <p>{socket.remoteAddress ? socket.remoteAddress: 'host'}:{socket.remotePort ? socket.remotePort : 'port'}</p>
              <p>{response.sessionId === socket.sessionId ? response.value : 'no data'}</p>
              <button className='button' onClick={() => handleSend(socket.sessionId)}>SEND</button>
              <button
                className='button'
                style={{ backgroundColor: socket.isConnect ? 'green' : 'red' }}
                onClick={() => handleDisConnect(socket.sessionId)}
              >
                {socket.isConnect ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
