import { useContext, useEffect, useState } from "react"
import { webSocketContext } from "../contexts/WebSocketContext"

type MessagePayload = {
  content: string;
  msg: string
}

export const Websocket = () => {
  const socket = useContext(webSocketContext)

  const [value, setvalue] = useState('');
  const [messages, setmessages] = useState<MessagePayload[]>([])

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected!')
    })
    socket.on('onMessage', (data: MessagePayload) => {
      console.warn('onMessage event received!');
      console.log(data);
      setmessages((prev)=> [...prev, data])
    })

    return () => {
      console.log('Unregistered Evets...')
      socket.off('connect');
      socket.off('onMessage');
    }
  }, [])

  const onSubmit = () => {
    socket.emit('newMessage', value)
    setvalue('')
   }

  return (
    <div>
      <div>
        <h1>Websocket Component</h1>
        <div>
          <input type="text" value={value} onChange={(e) => setvalue(e.target.value)} />
          <button onClick={()=> onSubmit()}>Submit</button>
        </div>
        <div>
          {messages.length === 0 ? <div>No Messages</div> : <div>
            {messages.map((msg) => <div> <p> { msg.content } </p> </div>)}
          </div> }
        </div>
      </div>
    </div>
  )
}