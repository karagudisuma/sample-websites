/* JS functions for quick reference. Copy the functions in playground and modify suitably */

const arr = [
  {id: "W345", name: "Suma"},
  {id: "H567", name: "Karthik"},
  {id: "G456", name: ""}
]

//Array reduce to collect object element
const reduceArrToObj = (arr) => {
  let result = arr.reduce((acc, item, i) => {
    acc[i] = item.id;
    return acc;
  }, {});
  return result; //[ W345, H567, G456 ]
}

console.log(reduceArrToObj(arr))();

