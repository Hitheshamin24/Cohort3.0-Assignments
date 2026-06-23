class Person {
  constructor(name) {
    this.name = name;
  }
  introduce() {
    console.log(`hello this is ${this.name}`);
  }
}
class Employee extends Person {
  constructor(name, salary) {
    super(name);
    this.salary = salary;
  }
  showSalary() {
    console.log(`Salary: ${this.salary}`);
  }
}

class Manager extends Employee{
    constructor(name,salary,department){
        super(name,salary)
        this.department=department
    }
    manageTeam(){
        console.log(`${this.name} manages the ${this.department} department`)
    }
}
const manager=new Manager("Hithesh",100000,"Development")
manager.introduce()
manager.showSalary()
manager.manageTeam()