'use strict';

import { useEffect, useState } from 'react';
import {io} from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:3001');

socket.on('connect', () => {
  console.log('SID', socket.id);
  console.log('SOCKET', socket);
});

function App() {
  const [messageArray, setMessageArray] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    socket.on('addMessage', (addMessage) => {
      setMessageArray((prevMessageArray) => [
        ...prevMessageArray,
        addMessage
      ]);
    });
    return () => {
      socket.off('addMessage');
    };
  }, []);

  function handleSendMessage() {
    if (newMessage !== '') {
      socket.emit('addMessage', newMessage);
      setNewMessage('');
    }
  }

  function handlePressEnter(event, elementName) {
    if (event.target.name === elementName && event.key === 'Enter') {
      handleSendMessage();
    }
  }

  return (
    <>
      <div className="card">
        <label htmlFor='newMessage'>
          New Message:
          <input 
            name='newMessage'
            type='text'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => handlePressEnter(e, 'newMessage')}
          />
        </label>
        <button onClick={handleSendMessage}>
          Send Message
        </button>
      </div>
      <div className='message-container'>
        {messageArray.length > 0 ?
          messageArray.map((message) => 
            <div key={message.date}>
              <p>{message.SID}</p>
              <p >{message.message}</p>
            </div>
          )
          : null
        }
      </div>
    </>
  )
}

export default App
