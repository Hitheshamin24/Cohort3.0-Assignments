class User {
  static count = 0;
  constructor(name) {
    this.name = name;
    User.count++;
  }
}
let person1=new User("Hithesh")
let person2=new User("Aman")
let person3=new User("Gunda")
console.log(`User count is ${User.count}`)
