"use strict";
function addTwoNumbers(n1, n2) {
    return n1 + n2;
}
const button = document.getElementById("button");
if (button) {
    button.addEventListener('click', (ev) => {
        ev.preventDefault();
        console.log(addTwoNumbers(1, 1));
    });
}
const addMultipleNumbers = (...args) => {
    return args.reduce((result, next) => result + next);
};
addMultipleNumbers(1, 2, 3, 4);
class Department {
    constructor(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    describe() {
        console.log('Department: ' + this._name);
    }
}
var accounting = new Department('Accounting');
accounting.describe();
accounting.name = 'test';
const accountingCopy = { describe: accounting.describe };
accountingCopy.describe();
const accountingCopy1 = { name: 's', describe: accounting.describe };
accountingCopy1.describe();
const accountingCopy2 = { describe: accounting.describe.bind(accounting) };
accountingCopy2.describe();
let test1 = 'test';
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        this.data = this.data.slice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
var nameDataStorage = new DataStorage();
nameDataStorage.addItem('Max');
nameDataStorage.addItem('Menu');
nameDataStorage.removeItem('Max');
console.log(nameDataStorage.getItems());
//# sourceMappingURL=app.js.map