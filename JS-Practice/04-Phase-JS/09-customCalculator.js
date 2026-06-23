let calculator = {
  value: 100,
};

function add(num1, num2) {
  this.value += num1 + num2;
  console.log(this.value);
}

add.call(calculator,10,20)
add.apply(calculator,[10,20])
let fn=add.bind(calculator)
fn(10,20)