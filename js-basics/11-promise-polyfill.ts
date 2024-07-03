const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, "foo"));
const promise3 = Promise.resolve(42);
const promise4 = Promise.reject("error");

[
  { status: "fulfilled", value: 3 },
  { status: "rejected", reason: "foo" },
  { status: "fulfilled", value: 42 },
  { status: "rejected", reason: "error" },
];

// const allSettled = (promises: Promise<any>[]) => {
//   const result: Array<
//     | { status: "fulfilled"; value: any }
//     | {
//         status: "rejected";
//         reason: string;
//       }
//   > = [];

//   promises.forEach(async (promise, index) => {
//     await new Promise(promise)
//       .then((data) => {
//         result[index] = {
//           status: "fulfilled",
//           value: data,
//         };
//       })
//       .catch((error) => {});
//   });

//   return result;
// };

const allSettled = (promises: Promise<any>[]) => {
  return new Promise((resolve) => {
    const result: Array<
      | { status: "fulfilled"; value: any }
      | {
          status: "rejected";
          reason: string;
        }
    > = [];
    let settledCount = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          result[index] = {
            status: "fulfilled",
            value,
          };
        })
        .catch((error) => {
          result[index] = {
            status: "rejected",
            reason: error,
          };
        })
        .finally(() => {
          settledCount++;
          if (settledCount === promises.length) {
            resolve(result);
          }
        });
    });
  });
};
allSettled([promise1, promise2, promise3, promise4]).then((r) => r);

// ------------------------

const promiseAll = (promises: Promise<any>[]) => {
  return new Promise<any>((resolve, reject) => {
    const result: any[] = [];
    let resolvedCount = 0;
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((data) => {
          resolvedCount++;
          result[index] = data;

          if (resolvedCount === promises.length) {
            resolve(result);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  });
};
/*

 Example usage
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(resolve, 100, 'foo'));
const promise3 = Promise.resolve(42);
const promise4 = Promise.reject('error');

Promise.all([promise1, promise2, promise3])
  .then((results) => {
    console.log('All resolved:', results);
    // Expected output: [3, 'foo', 42]
  })
  .catch((error) => {
    console.log('Rejected:', error);
  });

Promise.all([promise1, promise2, promise3, promise4])
  .then((results) => {
    console.log('All resolved:', results);
  })
  .catch((error) => {
    console.log('Rejected:', error);
    // Expected output: error
  });
  */
// -------------------

const promiseRace = (promises: Promise<any>[]) => {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise).then(resolve).catch(reject);
    });
  });
};

// ---------------
