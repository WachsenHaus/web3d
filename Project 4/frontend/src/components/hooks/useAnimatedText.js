import React, { useEffect, useState } from 'react';

export const useAnimatedText = (text, once, callback) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(displayText + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 150);
      return () => clearTimeout(timeout);
    } else if (!once) {
      setCurrentIndex(0);
      setDisplayText('');
    } else {
      callback?.();
    }
  }, [callback, displayText, currentIndex, once, text]);

  useEffect(() => {
    setCurrentIndex(0);
    setDisplayText('');
  }, [text]);

  return { displayText };
};
