const calc = {
  total: 0,
  // ❌
  //   add: (arg) => {
  //     this.total += arg;
  //     return this;
  //   },
  add(arg) {
    this.total += arg;
    return this;
  },
  sub: function (arg) {
    this.total -= arg;
    return this;
  },
};

const total = calc.add(1).sub(1).add(3).add(6).total; // 3
console.log({ total });
