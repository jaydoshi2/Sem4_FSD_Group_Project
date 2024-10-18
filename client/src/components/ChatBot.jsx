import React, { useEffect, useRef, useState } from 'react';
import Avatar from '../assets/Avatar1.svg'
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
    console.log(messages)
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
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        <button
          onClick={toggleChatbox}
          className="p-3 bg-indigo-600 rounded-full shadow-xl cursor-pointer hover:bg-indigo-800 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-300"
        >
          <i className="fas fa-comments h-6 w-6 text-white"></i>
        </button>
        {isOpen && (
          <div className="absolute bottom-16 right-0 w-80 sm:w-96 md:w-96 bg-white rounded-xl shadow-2xl overflow-hidden transition-transform duration-300 ease-in-out transform scale-100 origin-bottom-right">
            <div className="flex items-center bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-500 p-4 text-white">
              {/* Robot Image */}
              <img
                src={Avatar}
                alt="Chatbot"
                className="h-14 w-14 mr-3 rounded-full"
              />
              <div>
                <h4 className="font-bold text-lg">Chat Support</h4>
                <p className="text-sm opacity-80">Hi, I'm Sam. How can I assist you today?</p>
              </div>
            </div>
            <div className="h-64 sm:h-80 md:h-80 overflow-y-auto p-4 bg-gray-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 ${msg.name === 'Sam' ? 'text-left' : 'text-right'
                    }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${msg.name === 'Sam'
                      ? 'bg-indigo-100 text-indigo-900'
                      : 'bg-indigo-600 text-white'
                      }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-2 bg-white border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={inputMessage}
                  onChange={handleInputChange}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="w-52 sm:w-72 md:flex-grow px-4 py-2 bg-gray-100 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-300"
                >
                  Send
                </button>
              </div>
            </div>


          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
