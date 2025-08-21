// ScrollToTop.js
import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import styles from './style.scss';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(window.pageYOffset > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className='buttonContainer'>
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`${"scrollButton"} ${isVisible ? "visible" : ''}`}
      >
        <FaArrowUp size={24} />
      </button>
    </div>
  );
};

export default ScrollToTop;