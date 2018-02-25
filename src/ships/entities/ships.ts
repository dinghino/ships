import Entity from './entity'
import Vehicle, { VehicleOptions, VehicleConstructor, VehicleInfo } from './vehicle'
import { PartsProvider } from '../parts/vendors'

import { PartJSON } from '../parts/parts'

export interface ShipOptions extends VehicleOptions {
}

export interface ShipInfo extends VehicleInfo {
  topSpeed: number
  target: string | false
}

export interface ShipConstructor extends VehicleConstructor<Ship, ShipOptions> {
}

export abstract class Ship extends Vehicle {
  type: 'ship' = 'ship'
  abstract __type: ShipType

  protected target: Entity

  constructor(name: string, vendor: PartsProvider, options: ShipOptions) {
    super(name, vendor, options)
  }

  hasTarget() { return !!this.target }

  setTarget(target: Entity): Entity {
    this.target = target
    if (this.target === null) return
    console.log(`[ x ] The '${this.name}' is targetting '${target.name}'.`)
    return target
  }

  chooseTarget(targets: Entity[]): Entity {
    // remove current ship if present in the options
    targets = targets.filter(target => target !== this)
    const target = targets[Math.floor(Math.random() * targets.length)]
    return this.setTarget(target)
  }

  attack(target?: Entity) {
    if (target)
      this.setTarget(target)

    if (this.target) {
      if (this.hasUsableWeapons())
        this.weapon.fire(this, this.target)
      else {
        console.log(`[ i ] The '${this.name}' does not have usable weapons and goes somewhere else.`)
        this.setTarget(null)
        this.move()
      }
    }
  }

  move(direction?: string) {
    const speed = `at ${this.topSpeed} mph.`
    if (direction)
      console.log(`[ > ] The '${this.name}' is moving ${direction} ${speed}`)
    else if (this.target)
      console.log(`[ ! ] The '${this.name}' is moving toward the '${this.target.name}' at ${speed}`)
    else
      console.log(`[ ? ] The '${this.name}' is moving in a search pattern at ${speed}`)
  }

  get info(): ShipInfo {
    return {
      ...super.info,
      topSpeed: this.topSpeed,
      target: this.target && this.target.name,
    }
  }
  toJSON() {
    return {
      ...super.toJSON(),
      target: this.target && this.target._id,
    }
  }
}

export default Ship

export class Corvette extends Ship {
  __type = ShipType.CORVETTE
  hullMass = 10
}

export class Destroyer extends Ship {
  __type = ShipType.DESTROYER
  hullMass = 17
}

export class Cruiser extends Ship {
  __type = ShipType.CRUISER
  hullMass = 25
}

export class Battleship extends Ship {
  __type = ShipType.BATTLESHIP
  hullMass = 40
}

export class FishingShip extends Ship {
  __type = ShipType.FISHING;
  hullMass = 1
}


export const Ships = {
  Corvette,
  Destroyer,
  Cruiser,
  Battleship,
  FishingShip,
}
export enum ShipType {
  CORVETTE = 'CORVETTE',
  DESTROYER = 'DESTROYER',
  CRUISER = 'CRUISER',
  BATTLESHIP = 'BATTLESHIP',
  FISHING = 'FISHING SHIP',
}
