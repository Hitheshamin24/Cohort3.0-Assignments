let stock = [
  { id: 1, name: "Mouse", qty: 2 },
  { id: 2, name: "Keyboard", qty: 1 },
  { id: 3, name: "Monitor", qty: 1 },
];
function updateStock(id, quantity) {
  let stockIndex = stock.findIndex((s) => s.id == id);
  let stockToUpdate = stock[stockIndex];
  stockToUpdate.qty=quantity
  stock.splice(stockIndex,1,stockToUpdate)
  return stock;
}

console.log(updateStock(2, 4));
