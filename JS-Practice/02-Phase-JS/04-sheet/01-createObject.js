let student = {
  name: "Hithesh",
  age: 23,
  course: "MCA",
};
for (let key in student) {
  console.log(key, student[key]);
}
// using forEach

Object.keys(student).forEach((key) => console.log(key, student[key]));
