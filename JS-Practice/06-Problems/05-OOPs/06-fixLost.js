const user1 = {
  name: "Ritik",
  greet() {
    console.log(this.name);
  },
};

const user2={
  name:"Hithesh"
}
let fn = user1.greet.bind(user1);

fn()



function greet() {
console.log(this.name);
}

const user= {
  name:"Priya",
 
};
const fnp=greet.bind(user)
fnp()