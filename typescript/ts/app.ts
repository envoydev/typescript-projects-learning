function addTwoNumbers(n1: number, n2: number): number {
  return n1 + n2;
}

const button = document.getElementById("button");

if (button) {
  button.addEventListener('click', (ev) => {
    ev.preventDefault();
    console.log(addTwoNumbers(1, 1));
  })
}

const addMultipleNumbers = (...args: number[]) : number => {
  return args.reduce((result, next) => result + next)
} 

addMultipleNumbers(1,2,3,4)

class Department {
  private _name: string

  constructor(name: string) {
    this._name = name;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public describe(): void {
    console.log('Department: ' + this._name);
  }
}

var accounting = new Department('Accounting');
accounting.describe();
accounting.name = 'test';

const accountingCopy = { describe: accounting.describe }
accountingCopy.describe();

const accountingCopy1 = { name: 's', describe: accounting.describe }
accountingCopy1.describe();

const accountingCopy2 = { describe: accounting.describe.bind(accounting) }
accountingCopy2.describe();

type A = number | string;
type B = string | number;
type C = A & B;

let test1: C = 'test';

class DataStorage<T> {
  private data: T[] = [];

  public addItem(item: T) {
    this.data.push(item);
  }

  public removeItem(item: T) {
    this.data = this.data.slice(this.data.indexOf(item), 1);
  }

  public getItems(): T[] {
    return [...this.data];
  }
}

var nameDataStorage = new DataStorage<string>();
nameDataStorage.addItem('Max')
nameDataStorage.addItem('Menu')
nameDataStorage.removeItem('Max');
console.log(nameDataStorage.getItems());
