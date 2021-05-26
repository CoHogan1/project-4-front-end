import './App.css';
import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'



// socketIO
const ENDPOINT = "http://localhost:8000";
const socket = io.connect(ENDPOINT)


const Chat = () => {
    const [messages, setMessages] = useState(["~~Chat with your opponent~~"])
    const [message, setMessage] = useState('')
    let counter = useState(1)

    useEffect(()=>{
        getMessages()
    }, [messages.length])

    const getMessages = () => {
        socket.on('message', msg => {
            setMessages([...messages, msg])
        })
    }

    const onChange = e => { // this may not need the ()
        setMessage(e.target.value)
    }

    const onClick = () => {
        if (message !== ''){
            socket.emit('message', message)
            setMessage('')
        } else {
            alert('Fill out message please')
        }
    }

    return (
        <div className="chat">

            <div className="chatbox">
            {messages.length > 0 &&
            messages.map(msg => (
                <div className="text">
                  <p id={counter}>{msg}</p>
                </div>
                ))}
            </div>

            <div className="chat-controls">
            <input value={message} name="message" onChange={e => onChange(e)}/>
            <button onClick={()=> onClick()}>Send</button>
            </div>
            
        </div>
    )
}


export default Chat;
