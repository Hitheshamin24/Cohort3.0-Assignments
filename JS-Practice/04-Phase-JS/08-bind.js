function introduce() {
  console.log(this.name);
}
let person = {
  name: "Hithesh",
};
// let name=introduce.bind(person)
setTimeout(() => {
  introduce.bind(person)();
}, 2000);
