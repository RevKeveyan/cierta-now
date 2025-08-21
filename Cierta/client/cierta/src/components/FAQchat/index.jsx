// components/ChatWidget.jsx
import { useState } from 'react';
import ChatWindow from './ChatWindow';
import ChatIcon from './ChatIcon';
import { FAQ_DATA } from '../../helpers';

const ChatWidget = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="chat-widget">
      <ChatIcon onClick={() => setShowChat(!showChat)} />
      <ChatWindow
        show={showChat} 
        onHide={() => setShowChat(false)} 
        questions={FAQ_DATA}
      />
    </div>
  );
};

export default ChatWidget;