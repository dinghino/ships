import Entity from './entity'
import Vehicle, { VehicleOptions, VehicleConstructor, VehicleInfo } from './vehicle'
import { PartsProvider } from '../parts/vendors'

import { PartJSON } from '../parts/parts'

export interface AircraftOptions extends VehicleOptions{
}

export interface AircraftConstructor extends VehicleConstructor<Aircraft, AircraftOptions> {
}

export interface AircraftInfo extends VehicleInfo {
  target: string | false
}

export abstract class Aircraft extends Vehicle {
  abstract __type: AircraftType

  readonly type: 'aircraft' = 'aircraft'

  constructor( name: string, vendor: PartsProvider, options?: AircraftOptions) {
    super(name, vendor, options)
  }

  move(direction?: string): void {
    console.log(`[ ~ ] ${this.name} flies around`)
  }
  attack(target?: Entity): void {
    if (target)
      this.setTarget(target)

    if (this.target) {
      if (this.hasUsableWeapons()) {
        console.log(`[ . ] ${this.name} engages ${target.name} from above.`)
        this.weapon.fire(this, this.target)
    } else {
        console.log(`[ i ] The '${this.name}' does not have usable weapons and goes somewhere else.`)
        this.setTarget(null)
        this.move()
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

export enum AircraftType {
  BOMBER = 'BOMBER',
  FIGHTER = 'FIGHTER',
}

export default Aircraft