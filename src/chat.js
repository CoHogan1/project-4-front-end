import './App.css';
import React, { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'

// socketIO
let ENDPOINT

if (process.env.NODE_ENV === 'development') {
  ENDPOINT = 'http://localhost:8000/'
} else {
  ENDPOINT = "https://back-end-444.herokuapp.com/"
}
console.log(ENDPOINT, "This is the end point youre trying to hit")

const socket = io.connect(ENDPOINT)

const Chat = (props) => {
    const [messages, setMessages] = useState(['Lets play!'])
    const [message, setMessage] = useState('')


    const getMessages = () => { // this will place the game board in place?
        socket.on('message', msg => {
            //console.log(typeof(msg), msg)
            setMessages([...messages, msg])
        })
    }

    useEffect(()=>{
        scrollToBottom()
        getMessages()
    }, [messages.length])


    const onChange = e => {
        setMessage(e.target.value)
    }


    const onClick = (user) => {
        if (message !== ''){
            socket.emit('message', message)
            setMessage('')
        } else {
            alert('Fill out message please')
        }
    }
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }



    return (
        <div className="chat">

            <div className="chatbox">
                <div>Say Hello!</div>
            {messages.length > 0 &&
            messages.map((msg, index) => (
                <div key={index} className="text">
                    <p className={"p1"}>{msg}</p>
                </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-controls">
            <input value={message} name="message" onChange={e => onChange(e)}/>
            <button onClick={()=> onClick()}>Send</button>
            </div>

        </div>
    )
}


export default Chat;
