class BankAccount {
  constructor(accNo, name, balance) {
    this.accNo = accNo;
    this.name = name;
    this.balance = balance;
  }
  deposit(amount) {
    this.balance += amount;
    console.log(`${amount} is deposited to ${this.name}'s Account`);
  }
  withdraw(amount) {
    if (amount > this.balance) console.log("Insufficient fund");
    else {
      this.balance -= amount;
      console.log(`${amount} is withdrawn to ${this.name}'s Account`);
    }
  }
  checkBalance() {
    console.log(`ACCNo: ${this.accNo}
Name: ${this.name}
Amount: ${this.balance}`);
  }
}

let bank = new BankAccount(101, "HIthesh", 5000);
bank.checkBalance();
bank.deposit(5000);
bank.checkBalance();

bank.withdraw(5000);
bank.checkBalance();
bank.withdraw(5000);
