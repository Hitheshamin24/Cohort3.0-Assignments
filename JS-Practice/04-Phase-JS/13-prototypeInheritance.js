const vehicle = {
  start() {
    console.log(`${this.type} has started`);
  },
  stop() {
    console.log(`${this.type} has stopped`);
  },
};

let car = Object.create(vehicle);
car.type = "Car";
car.start();
car.stop();
let bike = Object.create(vehicle);
bike.type = "bike";
bike.start();
bike.stop();
let truck = Object.create(vehicle);
truck.type = "truck";
truck.start();
truck.stop();
