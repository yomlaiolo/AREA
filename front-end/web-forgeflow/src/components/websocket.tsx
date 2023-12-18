import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8080');

export default function SocketHandler() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        socket.on('message', (data) => {
            setMessage(data);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        console.log('Sending message')
        socket.emit('message', 'Hello from the frontend');
    };

    return (
        <div>
            <p>Received message: {message}</p>
            <button onClick={sendMessage}>Send message</button>
        </div>
    )
}
