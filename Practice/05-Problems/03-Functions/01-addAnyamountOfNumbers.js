function sum(...number) {
  let sumOfNumbers = number.reduce((acc, curr) => acc + curr);
  return sumOfNumbers
}
console.log(sum(1, 2, 3, 4, 5, 6, 7, 8, 9));
