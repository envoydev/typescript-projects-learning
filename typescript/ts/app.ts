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