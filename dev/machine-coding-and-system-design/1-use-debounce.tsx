import { useEffect, useState } from "react";

export const useDebounce = <T,>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timerHandler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timerHandler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// const debouncedSearchTerm = useDebounce(searchTerm, 500);

import { useCallback, useRef } from "react";

export const useDebouncedCallback = (callback: (...args: any[]) => void, delay: number) => {
  const timer = useRef<number | null>(null);

  const debouncedCallback = useCallback(
    (...args: any[]) => {
      if (timer.current !== null) {
        clearTimeout(timer.current);
      }
      timer.current = window.setTimeout(() => {
        callback(...args);
        timer.current = null;
      }, delay);
    },
    [callback, delay]
  );

  return debouncedCallback;
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
