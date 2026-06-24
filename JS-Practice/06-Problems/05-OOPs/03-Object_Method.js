const car = {
  brand: "BMW",
  showBrand() {
    console.log(this.brand);
  },
};
console.log(car.showBrand())