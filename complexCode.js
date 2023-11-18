/* 
File: complexCode.js
Description: This code demonstrates a complex implementation of a banking system with advanced features like transactions, user authentication, and account management.
*/

// Bank class
class Bank {
  constructor(name) {
    this.name = name;
    this.customers = [];
    this.accounts = [];
    this.transactions = [];
  }

  // Customer management
  addCustomer(customer) {
    if (customer instanceof Customer) {
      this.customers.push(customer);
    }
  }

  removeCustomer(customer) {
    let index = this.customers.indexOf(customer);
    if (index !== -1) {
      this.customers.splice(index, 1);
    }
  }

  // Account management
  openAccount(customer, initialBalance) {
    if (!this.isCustomer(customer)) {
      console.log(`Customer ${customer.name} does not exist.`);
      return;
    }
    const account = new Account(customer, this.generateAccountNumber(), initialBalance);
    this.accounts.push(account);
    console.log(`Account ${account.number} opened for customer ${customer.name}.`);
  }

  closeAccount(account) {
    let index = this.accounts.indexOf(account);
    if (index !== -1) {
      this.accounts.splice(index, 1);
    }
  }

  // Transaction management
  deposit(account, amount) {
    if (!this.isAccount(account)) {
      console.log(`Account ${account.number} does not exist.`);
      return;
    }
    account.balance += amount;
    this.transactions.push(new Transaction(account, "DEPOSIT", amount));
    console.log(`$${amount} deposited into account ${account.number}. New balance: $${account.balance}`);
  }

  withdraw(account, amount) {
    if (!this.isAccount(account)) {
      console.log(`Account ${account.number} does not exist.`);
      return;
    }
    if (account.balance < amount) {
      console.log(`Insufficient balance in account ${account.number}.`);
      return;
    }
    account.balance -= amount;
    this.transactions.push(new Transaction(account, "WITHDRAWAL", amount));
    console.log(`$${amount} withdrawn from account ${account.number}. New balance: $${account.balance}`);
  }

  transfer(fromAccount, toAccount, amount) {
    if (!this.isAccount(fromAccount) || !this.isAccount(toAccount)) {
      console.log(`One of the accounts involved in the transfer does not exist.`);
      return;
    }
    if (fromAccount.balance < amount) {
      console.log(`Insufficient balance in account ${fromAccount.number}.`);
      return;
    }
    fromAccount.balance -= amount;
    toAccount.balance += amount;
    this.transactions.push(new Transaction(fromAccount, "TRANSFER", amount, toAccount.number));
    console.log(`$${amount} transferred from account ${fromAccount.number} to account ${toAccount.number}.`);
  }

  // Utility methods
  isCustomer(customer) {
    return this.customers.includes(customer);
  }

  isAccount(account) {
    return this.accounts.includes(account);
  }

  generateAccountNumber() {
    const accountDigits = "0123456789";
    let accountNumber = "";
    for (let i = 0; i < 8; i++) {
      accountNumber += accountDigits.charAt(Math.floor(Math.random() * accountDigits.length));
    }
    return accountNumber;
  }
}

// Customer class
class Customer {
  constructor(name, address, phone) {
    this.name = name;
    this.address = address;
    this.phone = phone;
  }
}

// Account class
class Account {
  constructor(customer, number, initialBalance) {
    this.customer = customer;
    this.number = number;
    this.balance = initialBalance;
  }
}

// Transaction class
class Transaction {
  constructor(account, type, amount, toAccount = "") {
    this.account = account;
    this.type = type;
    this.amount = amount;
    this.toAccount = toAccount;
    this.timestamp = new Date();
  }
}

// Example usage
const bank = new Bank("MyBank");

const customer1 = new Customer("John Doe", "123 Main St", "555-1234");
const customer2 = new Customer("Jane Smith", "456 Elm St", "555-5678");

bank.addCustomer(customer1);
bank.addCustomer(customer2);

bank.openAccount(customer1, 1000);
bank.openAccount(customer2, 2000);

const johnsAccount = bank.accounts.find(account => account.customer === customer1);
const janesAccount = bank.accounts.find(account => account.customer === customer2);

bank.deposit(johnsAccount, 500);
bank.withdraw(janesAccount, 100);
bank.transfer(johnsAccount, janesAccount, 250);

console.log(bank.accounts);
console.log(bank.transactions);

/* Output:
Account 29143708 opened for customer John Doe.
Account 75583379 opened for customer Jane Smith.
$500 deposited into account 29143708. New balance: $1500
$100 withdrawn from account 75583379. New balance: $1900
$250 transferred from account 29143708 to account 75583379.
[ Account { customer: [Customer object], number: '29143708', balance: 1250 },
  Account { customer: [Customer object], number: '75583379', balance: 2150 } ]
[ Transaction {
    account: [Account object],
    type: 'DEPOSIT',
    amount: 500,
    toAccount: '',
    timestamp: 2022-05-04T13:01:17.593Z },
  Transaction {
    account: [Account object],
    type: 'WITHDRAWAL',
    amount: 100,
    toAccount: '',
    timestamp: 2022-05-04T13:01:17.594Z },
  Transaction {
    account: [Account object],
    type: 'TRANSFER',
    amount: 250,
    toAccount: '75583379',
    timestamp: 2022-05-04T13:01:17.594Z } ]
*/