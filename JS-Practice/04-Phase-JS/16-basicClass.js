class Student {
  constructor(name, course) {
    this.name = name;
    this.course = course;
  }
  introduce() {
    console.log(`Hello i am ${this.name} who is studying ${this.course}`);
  }
}

let person=new Student("Hithesh","Mern Stack")
person.introduce()