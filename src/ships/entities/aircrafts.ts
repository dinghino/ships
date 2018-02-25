import Entity from './entity'
import Vehicle, { VehicleOptions, VehicleConstructor, VehicleInfo } from './vehicle'
import { PartsProvider } from '../parts/vendors'

export interface AircraftOptions extends VehicleOptions{
}

export interface AircraftConstructor extends VehicleConstructor<Aircraft, AircraftOptions> {
}

export interface AircraftInfo extends VehicleInfo {
  target: string | false
}

export abstract class Aircraft extends Vehicle { // implements Entity {
  abstract __type: AircraftType

  readonly type: 'aircraft' = 'aircraft'

  protected target: Entity

  constructor(
    name: string,
    vendor: PartsProvider,
    options?: AircraftOptions
  ) {
    super(name)
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

  get info(): AircraftInfo {
    return {
      ...super.info,
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