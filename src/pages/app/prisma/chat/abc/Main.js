import React, { useState, useEffect } from "react";
import io from 'socket.io-client';
import { useMediaQuery } from 'react-responsive';
import { ServerIP } from '../../../../../services/server/export-server';
import style from '../Chat.module.css';

const socket = io(ServerIP);

export default function Main({ user, pf }) {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('chat message', (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        socket.on('initial messages', (initialMessages) => {
            setMessages(initialMessages); 
        });

        return () => {
            socket.off('chat message');
            socket.off('initial messages');
        };
    }, []); 

    return (
        <main className={style["chat-main"]}>
            <div className={style["message-container"]}>
                {messages.map((msg, index) => (
                    <p key={index} className={style["message"]}>{msg.sender}: {msg.message}</p>
                ))}
            </div>
        </main>
    );
}
