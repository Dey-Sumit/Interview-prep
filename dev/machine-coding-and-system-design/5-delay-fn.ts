const delay = (delayOf: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, delayOf);
  });
};

const delayFn = async (delayOf: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve("done");
    }, delayOf);
  });
