class BankAccount {
  #balance = 0;
  deposit(amount) {
    this.#balance += amount;
    console.log(`${amount} is deposited`);
  }
  withdraw(amount) {
    if (amount > this.#balance) {
      console.log(`"insufficient fund`);
      return;
    }
    console.log(`${amount} is withdrawn`)
    this.#balance -= amount;
  }
  getBalance() {
    return this.#balance;
  }
}

let account=new BankAccount()
account.deposit(1000)
account.withdraw(200)
console.log(account.getBalance())