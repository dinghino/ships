import Entity from './entity'
import Vehicle, { VehicleOptions, VehicleConstructor, VehicleInfo } from './vehicle'
import { PartsProvider } from '../parts/vendors'

import { MovingStrategy } from '../systems'

import { PartJSON } from '../parts/parts'

export interface AircraftOptions extends VehicleOptions{
}

export interface AircraftConstructor extends VehicleConstructor<Aircraft, AircraftOptions> {
}

export interface AircraftInfo extends VehicleInfo {
  target: string | false
}

export enum AircraftType {
  BOMBER = 'BOMBER',
  FIGHTER = 'FIGHTER',
}

export abstract class Aircraft extends Vehicle {

  static TYPE = AircraftType

  abstract __type: AircraftType

  readonly type: 'aircraft' = 'aircraft'

  constructor( name: string, vendor: PartsProvider, options?: AircraftOptions) {
    super(name, vendor, options)
    this.moveStrategy = MovingStrategy.getInstance(this, MovingStrategy.TYPE.FLY)
  }

  attack(target?: Entity): boolean {
    if (target)
      this.setTarget(target)

    if (this.target) {
      if (this.hasUsableWeapons()) {
        console.log(`[ . ] ${this.name} engages ${this.target.name} from above.`)
        this.weapon.fire(this, this.target)
        return true
    } else {
        console.log(`[ i ] The '${this.name}' does not have usable weapons and goes somewhere else.`)
        this.setTarget(null)
        this.move()
        return false
      }
    }
  }

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
  hullMass = 3
}

export class Fighter extends Aircraft {
  __type = AircraftType.FIGHTER
  hullMass = 1
}

export const Aircrafts = {
  Bomber,
  Fighter,
}

export default Aircraft