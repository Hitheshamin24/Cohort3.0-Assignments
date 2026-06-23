const button = {
  name: "Submit button",
  regularFunction() {
    console.log(this);
  },
  arrFunction:()=>{
    console.log(this)
  }
};

button.regularFunction()
button.arrFunction()