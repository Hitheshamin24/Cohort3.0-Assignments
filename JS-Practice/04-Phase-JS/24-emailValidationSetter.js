class User {
  set email(value) {
    if (!value.includes("@")) {
      console.log("invalid email");
      return;
    }
    this._email=value
  }
  get email(){
    return this._email
  }

}
let user=new User()
user.email="hitheshgmail.com"
user.email="hithesh@gmail.com"
console.log(user.email)