import React, { useState } from 'react';
import axios from 'axios';
import './ChatBot.css';

function ChatBot() {
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hi! How can I help you today?' }]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false); // for minimize toggle

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post('http://localhost:5000/api/chat', { message: input });
      const botMessage = { sender: 'bot', text: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Sorry, something went wrong.' }]);
    }

    setInput('');
  };

  return (
    <div className={`chatbot-float ${isOpen ? 'open' : ''}`}>
      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '−' : '💬'}
      </button>

      {isOpen && (
        <div className="chatbot-container">
          <div className="chat-window">
            {messages.map((msg, index) => (
              <div key={index} className={msg.sender === 'user' ? 'user-msg' : 'bot-msg'}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me something..."
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;
