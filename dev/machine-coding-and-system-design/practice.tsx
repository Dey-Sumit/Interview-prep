/*

const debouncedValue = useDebounce(value, delay);





*/

import { useCallback, useEffect, useRef, useState } from "react";

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(setDebouncedValue, delay, value);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
};

/*
  const [value, setValue] = useState('');

  const debouncedCallback = useDebouncedCallback((newValue) => {
    console.log('Debounced value:', newValue);
  }, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    debouncedCallback(newValue);
  };
  */

const useDebouncedCallback = (cb: (...args: any[]) => void, delay: number) => {
  let timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        cb(...args);
      }, delay);
    },
    [cb, delay]
  );

  return debouncedCallback;
};
