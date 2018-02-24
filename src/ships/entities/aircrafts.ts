import Entity from './entity'

import { Engine, EngineType } from '../parts/engines'
import { Weapon, WeaponType } from '../parts/weapons'
import { PartsProvider } from '../parts/vendors'

export interface AircraftOptions {
  engine: EngineType
  weapon: WeaponType
}

export interface AircraftConstructor {
  new (name: string, factory: PartsProvider, options?: AircraftOptions): Aircraft
}

export abstract class Aircraft extends Entity { // implements Entity {
  abstract __type: AircraftType

  readonly type: 'aircraft' = 'aircraft'

  protected engine: Engine
  protected weapon: Weapon

  protected target: Entity

  constructor(
    public name: string,
    vendor: PartsProvider,
    options?: AircraftOptions
  ) {
    super()
    this.engine = vendor.getEngine(options.engine)
    this.weapon = vendor.getWeapon(options.weapon)
  }

  move(direction?: string): void {
    console.log(`[ ~ ] ${this.name} flies around`)
  }
  attack(target?: Entity): void {
    if (target)
    this.setTarget(target)

  if (this.target) {
    if (this.weapon.usable) {
      console.log(`[ . ] ${this.name} engages ${target.name} from above.`)
      this.weapon.fire(this, this.target)
   } else {
      console.log(`[ i ] The '${this.name}' does not have usable weapons and goes somewhere else.`)
      this.setTarget(null)
      this.move()
    }
  }
  }
  setTarget(target: Entity): Entity {
    this.target = target
    console.log(`[ . ] The '${this.name}' is targetting '${target.name}'.`)
    return this.target
  }
  chooseTarget(targets: Entity[]): Entity {
    // remove current ship if present in the options
    targets = targets.filter(target => target !== this)
    const target = targets[Math.floor(Math.random() * targets.length)]
    return this.setTarget(target)
  }
  hasTarget() { return !!this.target }
}

export class Bomber extends Aircraft {
  __type = AircraftType.BOMBER
}

export class Fighter extends Aircraft {
  __type = AircraftType.FIGHTER
}

export const Aircrafts = {
  Bomber,
  Fighter,
}

export enum AircraftType {
  BOMBER = 'BOMBER',
  FIGHTER = 'FIGHTER',
}

export default Aircraft