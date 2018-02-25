import { Engine, EngineType } from './engines'
import { Weapon, WeaponType } from './weapons'
import { FuelTank, TanksType, FuelTankOptions } from './fuelTanks'

import {
  EnginesFactory,
  WeaponsFactory,
  FuelTankFactory,
} from './factories'
import * as utils from '../utils'

/**
 * A PartsProvider is a broker that provides various parts for ships, like a shop.
 * A client (ship) can require a specific part from one of the available ones
 * or get a random one hoping for the best.
 */
export interface PartsProvider {
  readonly __vendorName: Vendors

  readonly availableEngines: string[]
  readonly availableWeapons: string[]
  getEngine(type?: string, options?: any): Engine
  getWeapon(type?: string, options?: any): Weapon
  getFuelTank(type?: string, options?: FuelTankOptions): FuelTank
  
}

/**
 * This guy sells everything.
 * TODO: I want to be able to specify different vendors that have subsets of
 * parts and have typechecking done on the fly on the actual available types
 * that a provider has available. For example I may want to create a vendor
 * that, as weapons, only provide missiles of various types...
 */
export class PartsVendor implements PartsProvider {

  __vendorName = Vendors.GENERAL_STORE
  static __instance: PartsVendor
  protected constructor(
    protected enginesFactory = EnginesFactory.getInstance(),
    protected weaponsFactory = WeaponsFactory.getInstance(),
    protected fuelTankFactory = FuelTankFactory.getInstance(),
  ) {}

  static getInstance(): PartsVendor {
    if (!this.__instance) this.__instance = new PartsVendor()
    return this.__instance
  }

  get availableEngines() {
    return this.enginesFactory.availableParts
  }
  get availableWeapons() {
    return this.weaponsFactory.availableParts
  }
  get availableFuelTanks() {
    return this.fuelTankFactory.availableParts
  }

  getEngine(type?: EngineType, options?: any) {
    if (!type)
      type = utils.randomType(EngineType)
    return this.enginesFactory.create(type, this.__vendorName, options)
  }
  getWeapon(type?: WeaponType, options?: any) {
    if (!type)
      type = utils.randomType(WeaponType)
    return this.weaponsFactory.create(type, this.__vendorName, options)
  }
  getFuelTank(type?: TanksType, options?: FuelTankOptions) {
    if (!type)
      type = utils.randomType(TanksType)
    return this.fuelTankFactory.create(type, this.__vendorName, options)
  }
}


export enum Vendors {
  GENERAL_STORE = 'GENERAL STORE',
}
