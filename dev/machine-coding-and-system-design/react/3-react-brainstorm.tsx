import React, { useState, useEffect, createContext } from "react";

export function UseEffectCleanUpFunction() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Effect executed");

    // Simulating a subscription or side effect
    const intervalId = setInterval(() => {
      console.log("Count:", count);
    }, 1000);

    // Cleanup function
    return () => {
      console.log("Cleanup executed");
      clearInterval(intervalId);
    };
  }, [count]); // Dependency array

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

const CountContext = createContext<{
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}>({
  count: 0,
  setCount: () => {},
});

export const CountContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);
  return <CountContext.Provider value={{ count, setCount }}>{children}</CountContext.Provider>;
};

const CounterConsumingContext = () => {
  const { count, setCount } = React.useContext(CountContext);
  console.log("CounterConsumingContext rendered");

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
export const CounterWithContextWrapped = () => {
  return (
    <CountContextProvider>
      <CounterConsumingContext />
      <DummyNotConsumingContext />
    </CountContextProvider>
  );
};

const DummyNotConsumingContext = () => {
  return <div>dummy</div>;
};

const delay = (delayOf: number) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      return resolve();
    }, delayOf);
  });
};
