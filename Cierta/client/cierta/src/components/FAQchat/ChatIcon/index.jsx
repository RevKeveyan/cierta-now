// components/ChatIcon.jsx
import { FaCommentDots } from 'react-icons/fa';
import styles from './style.scss';

const ChatIcon = ({ onClick }) => {
  return (
    <button className="chatIcon" onClick={onClick}>
      <FaCommentDots size={24} />
    </button>
  );
};

export default ChatIcon;