Array.prototype.sum = function () {
  let total = 0;
  for (let i = 0; i < this.length; i++) {
    total += this[i];
  }
  return total
};

console.log([1,2,3,4].sum())
