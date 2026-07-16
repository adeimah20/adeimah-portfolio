import { useState, useEffect } from 'react';

export const useScrollSpy = (ids, offset = 120) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      let currentActiveId = '';
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentActiveId = id;
          }
        }
      }

      // Fallback untuk bagian paling atas
      if (window.scrollY < 50) {
        currentActiveId = 'hero';
      }

      setActiveId(currentActiveId);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger awal saat komponen dimuat

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ids, offset]);

  return activeId;
};
