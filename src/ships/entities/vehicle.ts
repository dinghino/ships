import { PartsProvider } from '../parts'
import Entity from './entity'
import { Engine, EngineType, EngineInfo } from '../parts/engines'
import { Weapon, WeaponType, WeaponInfo } from '../parts/weapons'
import { FuelTank, FuelTankType } from '../parts/fuelTanks'

export interface VehicleOptions {
  engine: EngineType
  weapon: WeaponType
  fuelTank?: FuelTankType
}

export interface VehicleInfo {
  class: string
  name: string
  engine: EngineInfo
  weapon: WeaponInfo
}

export interface VehicleConstructor<VT extends Vehicle, OPT extends VehicleOptions> {
  new (name: string, vendor: PartsProvider, options?: OPT): VT
}

export abstract class Vehicle extends Entity {
  __entityType: 'VEHICLE' = 'VEHICLE'
  protected engine: Engine
  protected weapon: Weapon
  protected fuelTank: FuelTank

  refuel(amount: number): number {
    return this.fuelTank.refuel(amount)
  }
  /**
   * Get an object describing the full Vehicle systems and current state
   */
  get info() {
    return {
      ...super.info,
      engine: this.engine.info,
      weapon: this.weapon.info
    }
  }
  toJSON() {
    return {
      ...super.toJSON(),
      engine: this.engine.toJSON(),
      weapon: this.weapon.toJSON(),
    }
  }
}

export default Vehicle
