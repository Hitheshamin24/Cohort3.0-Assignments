class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }
  increaseSalary() {
    this.salary *= 1.1;
    console.log(`Salary increased 10 percent`);
  }
  showSalary(){
    console.log(`Salary of the ${this.name} is ${this.salary.toFixed(2)}`)
  }
}
let person=new Employee("Hithesh",100000)
person.increaseSalary()
person.showSalary()