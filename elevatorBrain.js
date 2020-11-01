/*
To move the elevator, call the method 

building.callElevator(origin, destination)

This is a method inside the building class. You will need to pass 2 parameters: 

origin, which is the number of the floor where the call button was hit, and 
destination, which is the number of the floor where the person wants to go.
The method will find the optimal elevator to ride and move it to origin, open doors for the person to get in, and take them to the destination.


When the emergency button is hit, call the method

elevator.emergencyStop()

That will move the elevator to the nearest floor and open the doors for the person to get out.

When the reset button is hit, call the method 

resetEmergencyStop() 

That will make the elevator available again. 
*/


const UP = 1;
const DOWN = -1;

class Elevator {

  constructor(name, minFloor, maxFloor) {
    this.name = name;
    this.minFloor = minFloor;
    this.maxFloor = maxFloor;

    this.currentFloor = 0;

    this.originFloor = null;
    this.destinationFloor = null;

    this.emergencyStopped = false;
    this.isMoving = false;
    this.direction = 0;
    this.doorsAreOpen = true;
  }

  moveToFloor(origin, destination) {
    this.closeDoors();

    this.originFloor = origin;
    this.destinationFloor = destination;

    this.checkDirection();

    this.isMoving = true;
    this.moveOneFloor();
  }

  canMoveToFloor(destination) {
    return (this.minFloor <= destination && this.maxFloor >= destination
      && !this.isMoving && !this.emergencyStopped);
  }

  getDestination() {
    this.checkDirection();
    this.checkCurrentFloor();

    if (this.originFloor !== null) {
      return this.originFloor;
    } else if (this.destinationFloor !== null) {
      return this.destinationFloor;
    } else {
      return false;
    }
  }

  checkDirection() {
    if (this.originFloor !== null) {
      this.direction = (this.originFloor >= this.currentFloor) ? UP : DOWN;
    } else if (this.destinationFloor !== null) {
      this.direction = (this.destinationFloor >= this.currentFloor) ? UP : DOWN;
    } else {
      this.direction = null;
    }
  }

  checkCurrentFloor() {
    if (this.originFloor === this.currentFloor) {
      this.originFloor = null;
      this.openDoors();
    }

    if (this.originFloor === null
      && this.destinationFloor === this.currentFloor) {
      this.destinationFloor = null;
    }
  }

  moveOneFloor() {
    this.closeDoors();
    let thisElement = this;

    setTimeout( () => {
      let destination = thisElement.getDestination();
      if (destination === false) {
        return;
      }

      thisElement.currentFloor += thisElement.direction;

      if (destination != thisElement.currentFloor) {
        thisElement.moveOneFloor();
      } else {
        thisElement.checkIfArrived();
      }
    }, 1000);
  }

  checkIfArrived() {
    console.log(`${this.name} is moving to ${this.currentFloor}`);

    if (this.getDestination() === false) {
      this.arrived();
    } else {
      this.originFloor = null;
      this.moveOneFloor();
    }
  }

  arrived() {
    this.isMoving = false;
    this.openDoors();
  }

  openDoors() {
    if (this.doorsAreOpen) {return; }

    this.doorsAreOpen = true;
    console.log(`${this.name} is opening doors.`);
  }

  closeDoors() {
    if (!this.doorsAreOpen) {return; }

    this.doorsAreOpen = false;
    console.log(`${this.name} is closing doors.`);
  }

  emergencyStop() {
    this.isMoving = false;
    this.openDoors();
    this.originFloor = null;
    this.destinationFloor = null;
    this.emergencyStopped = true;
  }

  resetEmergencyStop() {
    this.emergencyStopped = false;
  }
}

class Building {

  constructor(min = -1, max = 10) {
    this.floors = [];
    this.elevators = [];
    this.prepareBuildingFloors(min, max);
  }

  prepareBuildingFloors(min, max) {
    if (min > max) {
      let tempMin = min;
      min = max;
      max = tempMin;
    }

    for (let i = min; i <= max; i++) {
      this.floors.push(i);
    }
  }

  addElevator(elevator) {
    this.elevators.push(elevator);
  }

  callElevator(origin, destination) {
    console.log(`\n~ Call elevator to travel from #${origin} to #${destination}`);

    let elevator = this.getNearPossibleElevator(origin, destination);

    console.log(`${elevator.name} is on floor ${elevator.currentFloor}`);

    elevator.moveToFloor(origin, destination);
  }

  getNearPossibleElevator(origin, destination) {
    let floorDiff = this.floors.length;
    let selectedElevator = null;

    this.elevators.forEach(elevator => {
      if (!elevator.canMoveToFloor(destination)) { return; }

      let elevatorDiff = Math.abs(elevator.currentFloor - origin);
      if (elevatorDiff < floorDiff) {
        floorDiff = elevatorDiff;
        selectedElevator = elevator;
      }
    });

    return selectedElevator;
  }

  getElevatorsStatus() {
    this.elevators.forEach(elevator => {
      console.log(`\t# ${elevator.name} is at floor ${elevator.currentFloor}`);
    });
  }
}


const elevatorA = new Elevator('A', -1, 10);
const elevatorB = new Elevator('B', -1, 10);

const building = new Building(-1, 10);
building.addElevator(elevatorA);
building.addElevator(elevatorB);


console.log(building.floors);


// test the elevators

for(k=1; k<(101); k++) {
  building.getElevatorsStatus();
  let startLevel = _Math.floor(Math.random() * 11); ;
  let endLevel = Math.floor(Math.random() * 11); ;
  let timing = Math.abs(startLevel - endLevel);
  setTimeout( () => { building.callElevator( startLevel,  endLevel); },  timing * 1000);
}

