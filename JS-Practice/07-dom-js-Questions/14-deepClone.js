function deepClone(value) {
  if (value === null || typeof value !== "object") return value;
  const clone = Array.isArray(value) ? [] : {};
  for (let key in value) {
    clone[key] = deepClone(value[key]);
  }
  return clone;
}
let obj = {
  name: "Hithesh",
  personal: { love: "Pallavi", address: "Haleangadi" },
};

let obj2=deepClone(obj);
obj2.personal.love="Hithesh"
console.log(obj)
console.log(obj2)
