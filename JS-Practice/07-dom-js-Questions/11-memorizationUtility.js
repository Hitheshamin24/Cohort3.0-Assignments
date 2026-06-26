function memoize(fn) {
  let cache = {};

  return function (...args) {
    let key = JSON.stringify(args);
    if (key in cache) {
      console.log("Returning from the cache");
      return cache[key];
    }
    console.log(cache);
    console.log("calculating");
    let result = fn(...args);
    cache[key] = result;
    return result;
  };
}

function add(a, b) {
  return a + b;
}
let memorizeAdd = memoize(add);

console.log(memorizeAdd(10, 5));
console.log(memorizeAdd(8, 7));
console.log(memorizeAdd(8, 7));
