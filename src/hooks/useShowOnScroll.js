import { useEffect, useState } from "react";



function useShowOnScroll() {
  const [show, setShow] = useState(true);



  useEffect(() => {

    let lastScrollY = window.scrollY;

    function controlShow () {
      const scrollY = window.scrollY;
      const goingDown = scrollY > lastScrollY;
      const diff = 10;
      const scrollDownTooFast = scrollY - lastScrollY >= diff;
      const scrollUpTooFast = scrollY - lastScrollY <= -diff;
  
      if ((goingDown===show)&&(scrollDownTooFast||scrollUpTooFast)) {
        setShow(!goingDown);
      }
  
      lastScrollY = window.scrollY;
    }

    window.addEventListener('scroll', controlShow);
    return () => {
      window.removeEventListener('scroll', controlShow);
    }
  }, [show]);

  return show;
};

export default useShowOnScroll;