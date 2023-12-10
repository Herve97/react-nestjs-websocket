import React from 'react';
import './App.css';
import { socket, WebSocketProvider } from './contexts/WebSocketContext';
import { Websocket } from './components/Websocket';

function App() {
  return (
    <WebSocketProvider value={socket}>
      <Websocket/>
    </WebSocketProvider>
  );
}

export default App;
