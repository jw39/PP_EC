import { useState, useEffect, useRef } from 'react';

function useCountUp(end, start = 0, duration = 20000, steps = 1.5) {
  const [count, setCount] = useState(start);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const totalSteps = end - start;
    const stepDuration = duration / steps;

    const animate = (timestamp) => {
      const elapsedTime = timestamp - animationFrameRef.current.startTime;
      const progress = Math.min(elapsedTime / stepDuration, 1);
      const newCount = start + progress * totalSteps;
      setCount(Math.round(newCount));

      if (progress < 1) {
        animationFrameRef.current.animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = {
      startTime: performance.now(),
      animationFrame: null,
    };

    animationFrameRef.current.animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameRef.current.animationFrame);
    };
  }, [end, start, duration, steps]);

  return count.toFixed(0);
}

export default useCountUp;