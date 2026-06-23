class Animal {
  constructor(name) {
    this.name = name;
  }
  eat() {
    console.log(`${this.name} is eating`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name);
  }
  bark() {
    console.log(`${this.name} is barking`);
  }
}

let dog=new Dog('Tommy')
dog.eat()
dog.bark()