import React, { useState } from 'react';
import axios from 'axios';

const ChatbotComponent = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/new_server_module/api/chatbot/', { user_input: userInput });
      setChatHistory([...chatHistory, {
        user_input: response.data.user_input,
        model_response: response.data.model_response,
        created_at: response.data.created_at
      }]);
      setUserInput('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Ask Me Chatbot</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter your message"
        />
        <button type="submit">Send</button>
      </form>
      <div>
        <h2>Chat History</h2>
        {chatHistory.map((message, index) => (
          <div key={index}>
            <p>User: {message.user_input}</p>
            <p>Chatbot: {message.model_response}</p>
            <p>Timestamp: {message.created_at}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatbotComponent;