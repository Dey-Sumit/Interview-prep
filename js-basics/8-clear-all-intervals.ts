/* const intervalIds: NodeJS.Timeout[] = [];

const setTrackedInterval = (callback: (...args: any[]) => void, delay: number) => {
  const intervalId = setInterval(callback, delay);
  intervalIds.push(intervalId);
  return intervalId;
};

const clearAllIntervals = (intervalIds: NodeJS.Timeout[]) => {
  while (intervalIds.length) {
    const id = intervalIds.pop();
    clearInterval(id);
  }
};

const interval1 = setTrackedInterval(() => console.log("Interval 1"), 1000);
const interval2 = setTrackedInterval(() => console.log("Interval 2"), 1500);
const interval3 = setTrackedInterval(() => console.log("Interval 3"), 2000);

// Clear all intervals after 3 seconds
setTimeout(() => {
  console.log("Clearing all intervals");
  clearAllIntervals(intervalIds);
}, 3000);
 */

const createIntervalManager = () => {
  const intervalIds: NodeJS.Timeout[] = [];

  const setTrackedInterval = (callback: (...args: any[]) => void, delay: number) => {
    const intervalId = setInterval(callback, delay);
    intervalIds.push(intervalId);
    return intervalId;
  };

  const clearAllIntervals = () => {
    if (!intervalIds.length) return;
    while (intervalIds.length) {
      const id = intervalIds.pop();
      clearInterval(id);
    }
  };

  return {
    clearAllIntervals,
    setTrackedInterval,
  };
};

// Create an instance of the interval manager
const intervalManager = createIntervalManager();

const interval1 = intervalManager.setTrackedInterval(() => console.log("Interval 1"), 1000);
const interval2 = intervalManager.setTrackedInterval(() => console.log("Interval 2"), 1500);
const interval3 = intervalManager.setTrackedInterval(() => console.log("Interval 3"), 2000);

// Clear all intervals after 3 seconds
setTimeout(() => {
  console.log("Clearing all intervals");
  intervalManager.clearAllIntervals();
}, 3000);
// ---------------
// clearAllTimeouts

const createTimeoutManager = () => {
  const timeoutIds: NodeJS.Timeout[] = [];

  const setTrackedTimeout = (callback: (...args: any[]) => void, delay: number) => {
    const timeoutId = setTimeout(() => {
      callback();

      //  optional: we can also remove the id at the last as soon as the callback is executed
      const timeoutIdIndex = timeoutIds.indexOf(timeoutId);
      if (timeoutIdIndex < 1) {
        timeoutIds.splice(timeoutIdIndex, 1);
      }
    }, delay);
    timeoutIds.push(timeoutId);
    return timeoutId;
  };

  const clearAllTimeouts = () => {
    if (!timeoutIds.length) return;
    while (timeoutIds.length) {
      const id = timeoutIds.pop();
      clearTimeout(id);
    }
  };

  return {
    clearAllTimeouts,
    setTrackedTimeout,
  };
};

// Create an instance of the interval manager
const timeoutManager = createTimeoutManager();

const timeout1 = timeoutManager.setTrackedTimeout(() => console.log("Timeout 1"), 1000);
const timeout2 = timeoutManager.setTrackedTimeout(() => console.log("Timeout 2"), 1500);
const timeout3 = timeoutManager.setTrackedTimeout(() => console.log("Timeout 3"), 2000);

// Clear all intervals after 3 seconds
setTimeout(() => {
  console.log("Clearing all timeouts");
  timeoutManager.clearAllTimeouts();
}, 3000);
