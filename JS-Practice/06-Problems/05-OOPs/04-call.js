// explicit binding
function introduce() {
  console.log(this.name);
}
const person1 = {
  name: "Hithesh",
};
const person2 = {
  name: "Pallavi",
};
introduce.call(person1);
introduce.call(person2);


// passing argument 
function introduceArg(city,country){
    console.log(`Hello I am ${this.name} from ${city} ,${country}`)
}

introduceArg.call(person1,"Mangaluru","India")
introduceArg.call(person2,"Mulky","India")