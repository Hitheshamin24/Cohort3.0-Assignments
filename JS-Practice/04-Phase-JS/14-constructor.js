function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet=function(){
    console.log(`Hello i am ${this.name} and I am ${this.age} year old`)
}

let person1=new Person("hithesh",23)
let person2=new Person("Rahul",23)
person1.greet()
person2.greet()