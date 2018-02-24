import Entity from './entity'
import { Engine, EngineType, EngineInfo } from '../parts/engines'
import { Weapon, WeaponType, WeaponInfo } from '../parts/weapons'
import { PartsProvider } from '../parts/vendors'

export interface ShipOptions {
  engine: EngineType
  weapon: WeaponType
}

export interface ShipInfo {
  class: string
  name: string
  mass: number
  topSpeed: number

  target: string | false

  engine: EngineInfo
  weapon: WeaponInfo
}

export interface ShipConstructor {
  new (name: string, factory: PartsProvider, options?: ShipOptions): Ship
}

export abstract class Ship extends Entity {
  type: 'ship' = 'ship'
  abstract __type: ShipType
  protected engine: Engine
  protected weapon: Weapon

  protected target: Entity

  abstract mass: number

  constructor(public name: string, private partsFactory: PartsProvider, options: ShipOptions) {
    super()
    this.engine = partsFactory.getEngine(options.engine)
    this.weapon = partsFactory.getWeapon(options.weapon)
  }

  hasUsableWeapons() { return this.weapon.usable }

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
    const speed = `at ${this.speed} mph.`
    if (direction)
      console.log(`[ > ] The '${this.name}' is moving ${direction} ${speed}`)
    else if (this.target)
      console.log(`[ ! ] The '${this.name}' is moving toward the '${this.target.name}' at ${speed}`)
    else
      console.log(`[ ? ] The '${this.name}' is moving in a search pattern at ${speed}`)
  }

  get speed() {
    return parseFloat((this.engine.power / this.mass).toFixed(2))
  }
  /**
   * Get an object describing the full Ship system and current state
   */
  get info(): ShipInfo {
    return {
      ...super.info,
      mass: this.mass,
      topSpeed: this.speed,
      target: this.target && this.target.name,
      engine: this.engine.info,
      weapon: this.weapon.info,
    }
  }
  /**
   * Serialize the minimum information required to rebuild the object.
   */
  toJSON() {
    return {
      ...super.toJSON(),
      target: this.target && this.target._id,
      engine: this.engine.toJSON(),
      weapon: this.weapon.toJSON(),
    }
  }
}

export default Ship

export class Corvette extends Ship {
  __type = ShipType.CORVETTE
  mass = 10
}

export class Destroyer extends Ship {
  __type = ShipType.DESTROYER
  mass = 17
}

export class Cruiser extends Ship {
  __type = ShipType.CRUISER
  mass = 25
}

export class Battleship extends Ship {
  __type = ShipType.BATTLESHIP
  mass = 40
}

export class FishingShip extends Ship {
  __type = ShipType.FISHING;
  mass = 1
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
