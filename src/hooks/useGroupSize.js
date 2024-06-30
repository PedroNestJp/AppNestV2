import { useCallback, useEffect, useState } from "react";

export const useGroupSize = () => {
    const [groupSize, setGroupSize] = useState(3);
  
    const handleResize = useCallback(() => {
      if (window.matchMedia('(max-width: 980px)').matches) {
        setGroupSize(1);
      } else if (window.matchMedia('(max-width: 1200px)').matches) {
        setGroupSize(2);
      } else {
        setGroupSize(3);
      }
    }, []);
  
    useEffect(() => {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);
  
    return groupSize;
  };