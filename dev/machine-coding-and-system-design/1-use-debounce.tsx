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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
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
