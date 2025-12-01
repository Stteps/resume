import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";


const AutoScroller = ({ delayBeforeScroll = 2000, delayAtBottom = 2000, scrollSpeed = 1, fadeDuration = 1000, height = 750, children }) => {
  const boxRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  // Main scrolling loop
  useEffect(() => {
    const box = boxRef.current;
    if (!box)
        return;

    // Detect overflow
    if (box.scrollHeight <= box.clientHeight)
        return;

    let animationFrame;
    let timer;

    const startScrolling = () => {
      const step = () => {
        box.scrollTop += scrollSpeed;

        const atBottom =
          box.scrollTop + box.clientHeight >= box.scrollHeight - 1;

        if(atBottom)
          timer = setTimeout(() => fadeOutAndReset(), delayAtBottom);
        else
          animationFrame = requestAnimationFrame(step);
      };

      animationFrame = requestAnimationFrame(step);
    };

    const fadeOutAndReset = () => {
      setIsVisible(false);

      setTimeout(() => {
        box.scrollTop = 0; // instant reset to top
        setIsVisible(true);

        setTimeout(() => startScrolling(), delayBeforeScroll);
      }, fadeDuration);
    };

    // Initial delay before scrolling starts
    timer = setTimeout(startScrolling, delayBeforeScroll);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(timer);
    };
  }, [delayBeforeScroll, delayAtBottom, scrollSpeed, fadeDuration]);

  return (
    <div
      ref = { boxRef }
      style = {{
        width: "100%",
        height: height,
        overflow: "hidden",
        opacity: isVisible ? 1 : 0,
        transition: `opacity ${fadeDuration}ms`
      }}
    >
      { children }
    </div>
  );
};

AutoScroller.propTypes = {
    delayBeforeScroll: PropTypes.number,
    delayAtBottom: PropTypes.number,
    scrollSpeed: PropTypes.number,
    fadeDuration: PropTypes.number,
    height: PropTypes.number,
    children: PropTypes.any
};

export default AutoScroller;