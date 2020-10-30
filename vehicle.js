class Vehicle {
  constructor(make, model, year, weight) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.needsMaintenance = false;
    this.tripsSinceMaintenance = 0;
  }

  repair() {
    this.tripsSinceMaintenance = 0;
    this.needsMaintenance = false;
  }

  info() {
    console.log(`
************************
Vehicle characteristics:
************************`)
    console.log(`Make: ${this.make}`);
    console.log(`Model: ${this.model}`);
    console.log(`Year: ${this.year}`);
    console.log(`Weight: ${this.weight}`);
    console.log(`- Needs maintenance: ${this.needsMaintenance}`);
    console.log(`- Trips since maintenance: ${this.tripsSinceMaintenance}`);
  }
}


class Cars extends Vehicle {
  drive() {
    this.isDriving = true;
  }

  stop() {
    if (this.isDriving === true) {
      this.tripsSinceMaintenance += 1;
      if (this.tripsSinceMaintenance > 100) {
      this.needsMaintenance = true;
      }
    }
    this.isDriving = false;
  }
}


class Planes extends Vehicle {
  flying() {
    if (this.needsMaintenance) {
      console.log("⚠️ Needs Maintenance. Can't fly until repaired.");
      this.isFlying = false;
    }
    this.isFlying = true;
  }
  

  landing() {
    if (this.isFlying === true) {
      this.tripsSinceMaintenance += 1;
      if (this.tripsSinceMaintenance > 100) {
        this.needsMaintenance = true;
      }
    }
    this.isFlying = false;  
  }
}


function drivingTest(car) {
  rides = Math.floor(Math.random() * 100 + 2);
  for (let i=0; i <= rides; i++) {
    car.drive();
    car.stop()
  }
}


function flyingTest(plane) {
  flights = Math.floor(Math.random() * 100 + 2);
  for (let i=0; i <= flights; i++) {
    plane.flying();
    plane.landing();
  }
}  


const jimsCar = new Cars('Ferrari', 'GRAN TURISMO', 2020, 1100);
const joesCar = new Cars('Jeep', 'Cherokee', 2019, 1520);
const alicesCar = new Cars('Porsche', '911 Turbo S', 2020, 1020);

drivingTest(jimsCar);
jimsCar.info();

drivingTest(joesCar);
joesCar.info();

drivingTest(alicesCar);
alicesCar.info();


const firstPlane = new Planes('Boeing', 'V-22 Osprey', 2018, 200150);
const secondPlane = new Planes('Concorde', 'Revell', 2000, 400000);

flyingTest(firstPlane);
firstPlane.info();

flyingTest(secondPlane);
secondPlane.info();
