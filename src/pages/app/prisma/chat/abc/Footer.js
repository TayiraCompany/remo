import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import EmojiPicker from "emoji-picker-react";
import style from "../Chat.module.css";
import { ServerIP } from '../../../../../services/server/export-server';
import io from 'socket.io-client';

const socket = io(ServerIP);

export default function Footer({ user, pf }) {
    const [message, setMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 768 });

    const sendMessage = () => {
        if (message.trim() !== "") {
            socket.emit('chat message', { sender: user.id, receiver: pf.id, message });
            setMessage(""); // Clear message after sending
        }
    };

    const handleEmojiClick = (emojiObject) => {
        const emoji = emojiObject.unified.split('-').map((el) => String.fromCodePoint('0x' + el)).join('');
        setMessage((prevMessage) => prevMessage + emoji);
        setShowEmojiPicker(false);
    };

    return (
        <footer className={style["chat-footer"]}>
            <div className={style["message-input"]}>
                <input
                    type="text"
                    className={style["message-text"]}
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                {!isMobile && (
                    <button
                        className={`${style["send-button"]} ${style["send-button-desktop"]}`}
                        onClick={sendMessage}
                    >
                        Send
                    </button>
                )}
            </div>
            <div className={style["emoji-pad"]}>
                <button
                    className={style["emoji-button"]}
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                    😊
                </button>
                {showEmojiPicker && (
                    <div className={style["emoji-picker-react"]}>
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </div>
                )}
            </div>
            {isMobile && (
                <button
                    className={`${style["send-button"]} ${style["send-button-mobile"]}`}
                    onClick={sendMessage}
                >
                    Send
                </button>
            )}
        </footer>
    );
}
