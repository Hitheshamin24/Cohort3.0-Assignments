let obj = {
  name: "Rahul",
  hobbies: ["Coding", "Gaming", "Reading"],
  printHobbies() {
    this.hobbies.forEach((hobby) =>
      console.log(`${this.name} likes ${hobby}`),
    );
  },
};

obj.printHobbies()
