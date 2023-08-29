import React, { useEffect, useState } from 'react';
import { FaAngleUp } from 'react-icons/fa';

const goToTop = () => {
  window.scrollTo({
      top: 0,
      behavior: 'smooth',
  });
};

const ButtonToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  
  useEffect(() => {
    function handleScrolling() {
        if (window.scrollY > 400) {
          setShowTopBtn(true);
      } else {
          setShowTopBtn(false);
      }
    }
    window.addEventListener('scroll', handleScrolling);
    return () => window.removeEventListener('scroll', handleScrolling);
  }, []);

  if (showTopBtn) {
    return (<button id='btn-scroll-to-top' onClick={goToTop} aria-label='Scroll to top'>
    <FaAngleUp />
  </button>)
  }

  return null
}

export default ButtonToTop;