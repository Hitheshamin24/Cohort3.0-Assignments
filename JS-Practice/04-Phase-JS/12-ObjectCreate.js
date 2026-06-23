let animal = {
  name: "Naayi",
  eat() {
    console.log("Eating...");
  },
  sleep(){
    console.log("sleeping ....")
  }
};

let dog=Object.create(animal)
dog.name="tommy"
console.log(dog.name)
dog.eat()
dog.sleep()