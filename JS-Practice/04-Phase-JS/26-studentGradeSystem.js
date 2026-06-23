class Student {
  #marks;
  setMarks(marks) {
    this.#marks = marks;
  }
  getMarks() {
    return this.#marks;
  }

  set marks(marks){
    this.#marks=marks
  }
  get marks(){
    return this.#marks
  }
}

let student=new Student()
student.setMarks(100)
console.log(student.getMarks())

student.marks=45
console.log(student.marks)