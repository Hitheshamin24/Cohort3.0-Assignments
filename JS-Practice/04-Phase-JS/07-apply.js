function introduce(city,country){
    console.log(`I am ${this.name} from ${city}, ${country}`)
}

let person1={
    name:"Rahul"
}
introduce.apply(person1,["Mangalore","India"])