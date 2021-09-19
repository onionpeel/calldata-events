let percentages = [1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7]


let sum = percentages.reduce((b,n) => {
  return b + n;
}, 0);

let basis = percentages.map(num => num * 100);

console.log(basis);
