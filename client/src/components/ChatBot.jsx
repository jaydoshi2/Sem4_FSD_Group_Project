import React, { useState, useRef, useEffect } from 'react';
import '../styles/Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false); // Control the state of the chatbox
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const userMessage = { name: 'User', message: inputMessage };
    setMessages([...messages, userMessage]);
    setInputMessage('');

    try {
      const response = await fetch(`http://${import.meta.env.VITE_MY_IP}:8000/api/predict/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      const textResponse = await response.text(); // Read response as plain text
      console.log('Response from Flask:', textResponse);

      try {
        const data = JSON.parse(textResponse); // Try parsing the JSON response
        const botMessage = { name: 'Sam', message: data.answer };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError);
      }
    } catch (error) {
      console.error('Error fetching from server:', error);
    }
  };


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`chatbox ${isOpen ? 'chatbox--active' : ''}`}>
      <div className="chatbox__button">
        <button onClick={toggleChatbox}>
          <img src="../../public/chat_bot.svg" alt="Chatbox Icon" />
        </button>
      </div>
      {isOpen && (
        <div className="chatbox__support">
          <div className="chatbox__header">
            <div className="chatbox__image--header">
              <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png" alt="image" />
            </div>
            <div className="chatbox__content--header">
              <h4 className="chatbox__heading--header">Chat support</h4>
              <p className="chatbox__description--header">Hi. My name is Sam. How can I help you?</p>
            </div>
          </div>
          <div className="chatbox__messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`messages__item ${msg.name === 'Sam' ? 'messages__item--visitor' : 'messages__item--operator'}`}
              >
                {msg.message}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbox__footer">
            <input
              type="text"
              placeholder="Write a message..."
              value={inputMessage}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button className="chatbox__send--footer send__button" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
