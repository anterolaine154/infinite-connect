/*
 * Filename: sophisticated_app.js
 * Description: A sophisticated and complex JavaScript application
 * Author: Your Name
 * Version: 1.0
 */

// Create a class named Person
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
  }
}

// Create a class named Employee that extends Person
class Employee extends Person {
  constructor(name, age, position) {
    super(name, age);
    this.position = position;
  }

  work() {
    console.log(`${this.name} is working as a ${this.position}`);
  }
}

// Create a class named Company
class Company {
  constructor(name) {
    this.name = name;
    this.employees = [];
  }

  hire(employee) {
    this.employees.push(employee);
    console.log(`${employee.name} has been hired by ${this.name}`);
  }

  fire(employee) {
    const index = this.employees.findIndex(e => e.name === employee.name);
    if (index !== -1) {
      this.employees.splice(index, 1);
      console.log(`${employee.name} has been fired from ${this.name}`);
    }
  }

  listEmployees() {
    console.log(`Employees of ${this.name}:`);
    this.employees.forEach(e => console.log(`${e.name} - ${e.position}`));
  }
}

// Create some Person and Employee instances
const john = new Person("John Doe", 30);
const jane = new Person("Jane Smith", 25);
const manager = new Employee("Manager", 45, "Manager");
const developer = new Employee("Developer", 35, "Developer");

// Create a Company instance and add employees
const company = new Company("ABC Company");
company.hire(manager);
company.hire(developer);

// Call methods on the instances
john.greet();
jane.greet();
manager.work();
developer.work();
company.listEmployees();

// Output:
// Hello, my name is John Doe and I'm 30 years old.
// Hello, my name is Jane Smith and I'm 25 years old.
// Manager is working as a Manager
// Developer is working as a Developer
// Employees of ABC Company:
// Manager - Manager
// Developer - Developer