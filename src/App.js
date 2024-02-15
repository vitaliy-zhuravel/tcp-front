import { useState, useEffect } from 'react';
import './App.css';
import { 
  sendData, 
  disConnect, 
  getActiveSockets, 
  deleteSocket,
  connectSocket
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
    console.log(response)
    await setResponse({value: response.value, sessionId: response.sessionId})
  }

  // const handleDisConnect = async (id) => {
  //     await disConnect(id)
  //     setIsReady(!isReady)
  // }


  const handleDelete = async (id) => {
    await deleteSocket(id)
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

  console.log(sockets)
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
              <p>{socket.remoteAddress ? socket.remoteAddress: 'unknown-host'}:{socket.remotePort ? socket.remotePort : 'unknown-port'}</p>
              <p>{response.sessionId === socket.sessionId ? response.value : 'no data'}</p>
              <button className='button' onClick={() => handleSend(socket.sessionId)}>SEND</button>
              <button
                className='button'
                style={{ backgroundColor: socket.isConnect ? 'green' : 'red' }}
                onClick={() => {
                  socket.isConnect
                    ? disConnect(socket.sessionId)
                    : connectSocket(socket.sessionId);
                  setIsReady(!isReady);
                } }
              >
                {socket.isConnect ? 'Disconnect' : 'Connect'}
              </button>
              <button className='button' onClick={() => handleDelete(socket.sessionId)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
      {/* { response.value !== '' && <div className='inputBox response'>
      <p>Response: <i>{response.value}</i></p>
      <p>SessionId: <i>{response.sessionId}</i></p>
    </div>} */}

    </div>
    </>
  );
}
