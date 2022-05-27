import React, { useCallback, useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import './style.css';

export const SliderItem = ({ children, width, height, flexDirection }) => {
  return (
    <div
      className="slider-item"
      style={{
        width: width,
        height: height,
        flexDirection: flexDirection,
      }}
    >
      {children}
    </div>
  );
};

export default function Slider(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const updateIndex = useCallback(
    (newIndex) => {
      if (newIndex < 0) {
        newIndex = React.Children.count(props.children) - 1;
      } else if (newIndex >= React.Children.count(props.children)) {
        newIndex = 0;
      }
      setActiveIndex(newIndex);
    },
    [props.children]
  );

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1);
      }
    }, 9000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [activeIndex, paused, props.children, updateIndex]);

  function removingOne(index) {
    return index - 1;
  }

  return (
    <div
      {...handlers}
      className="slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ height: props.height, background: props.background }}
    >
      <div className="inner" style={{ transform: `translateX(-${activeIndex * 100}%` }}>
        {React.Children.map(props.children, (_child) => {
          return React.cloneElement(_child, { width: '100%' });
        })}
      </div>

      <div className="indicators">
        <button
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        <button
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      <div className="rounded-indicators">
        {React.Children.map(props.children, (index) => {
          return (
            <button
              className={`${removingOne(index.key) === activeIndex && 'active'}`}
              onClick={() => {
                updateIndex(removingOne(index.key));
              }}
            ></button>
          );
        })}
      </div>
    </div>
  );
}
