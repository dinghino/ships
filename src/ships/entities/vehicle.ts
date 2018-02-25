import { PartsProvider } from '../parts'
import Entity from './entity'
import { Engine, EngineType, EngineInfo } from '../parts/engines'
import { Weapon, WeaponType, WeaponInfo } from '../parts/weapons'
import { FuelTank, TanksType, FuelTankInfo, FuelTankOptions } from '../parts/fuelTanks'


import { PartJSON } from '../parts/parts'

export interface VehicleOptions {
  engine: EngineType
  weapon: WeaponType
  fuelTank: TanksType
  tankOptions?: FuelTankOptions
}

export interface VehicleInfo {
  class: string
  name: string
  mass: number
  topSpeed: number
  engine: EngineInfo
  weapon: WeaponInfo
  fuel: FuelTankInfo
}

export interface VehicleConstructor<VT extends Vehicle, OPT extends VehicleOptions> {
  new (name: string, vendor: PartsProvider, options?: OPT): VT
}

export abstract class Vehicle extends Entity {
  __entityType: 'VEHICLE' = 'VEHICLE'

  abstract hullMass: number

  protected engine: Engine
  protected weapon: Weapon
  protected fuelTank: FuelTank

  constructor(name: string, vendor: PartsProvider, options: VehicleOptions) {
    super(name)

    this.engine = vendor.getEngine(options.engine)
    this.weapon = vendor.getWeapon(options.weapon)
    this.fuelTank = vendor.getFuelTank(options.fuelTank, options.tankOptions)
  }

  get mass(): number {
    return this.hullMass + this.fuelTank.mass
  }

  get topSpeed() {
    return parseFloat((this.engine.power / this.mass).toFixed(2))
  }

  hasUsableWeapons() { return this.weapon && this.weapon.usable }

  /**
   * Get an object describing the full Vehicle systems and current state
   */
  get info(): VehicleInfo {
    return {
      ...super.info,
      mass: this.mass,
      engine: this.engine.info,
      weapon: this.weapon.info,
      fuel: this.fuelTank.info,
      topSpeed: this.topSpeed,
    }
  }
  toJSON() {
    return {
      ...super.toJSON(),
      entityType: this.__entityType,
      engine: this.engine.toJSON(),
      weapon: this.weapon.toJSON(),
      fuelTank: this.fuelTank.toJSON(),
    }
  }
}

export default Vehicle
