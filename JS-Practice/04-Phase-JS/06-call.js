function introduce() {
  console.log(`Hi, I am ${this.name}`);
}
let person1 = {
  name: "Anubhav",
};
let person2 = {
  name: "Rahul",
};

introduce.call(person1);
introduce.call(person2);
