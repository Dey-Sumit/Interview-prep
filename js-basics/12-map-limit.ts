const mapLimit = (iterable: Promise<any>[], limit: number, callback: (value: any) => void) => {
  return new Promise((resolve, reject) => {
    let index = 0;
    let activePromises = 0;
    let resolvedResults: any[] = [];
    // let rejectedErrors: any[] = [];

    const next = () => {
      // if all items are processed and no active promises, resolve the results
      /*    if (index >= iterable.length && activePromises.length === 0) {
        if (rejectedErrors.length) {
          reject(rejectedErrors);
        } else {
          resolve(resolvedResults);
        }
      } */
      if (index >= iterable.length && activePromises === 0) {
        resolve(resolvedResults);
        return;
      }

      // start new promises as long as the limit is not reached and items are left
    };

    next();
  });
};
