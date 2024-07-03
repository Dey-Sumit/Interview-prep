const flattenObject = (obj, parentKey = "", result = {}) => {
  for (let key in obj) {
    // if (obj.hasOwnProperty(key)) {
    const newKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      flattenObject(obj[key], newKey, result);
    } else {
      result[newKey] = obj[key];
    }
    // }
  }
  return result;
};
const nestedObj = {
  a: {
    b: {
      c: 1,
      d: 2,
    },
    e: 3,
  },
  f: 4,
  g: null,
};
