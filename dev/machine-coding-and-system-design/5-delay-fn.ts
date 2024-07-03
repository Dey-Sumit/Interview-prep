const delay = (delayOf: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, delayOf);
  });
};
