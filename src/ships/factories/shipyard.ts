import GameEntityFactory from './factory'

import * as Vendors from '../parts/vendors'
import { WeaponType } from '../parts/weapons'
import { EngineType } from '../parts/engines'

import * as utils from '../utils'
import {
  ShipOptions,
  ShipConstructor,

  ShipType, // enum for ship selection
  Ship,     // base abstract class (interface)

  FishingShip,
  Corvette,
  Destroyer,
  Cruiser,
  Battleship,
} from '../entities/ships'


/**
 * A Shipyard is capable of producing various types of ships
 */

export class Shipyard implements GameEntityFactory<Ship, ShipOptions, ShipType> {
  readonly availableShips = ShipType

  build(name: string, type?: ShipType, options?: Partial<ShipOptions>): Ship {
    if (!type) type = utils.randomType(ShipType)

    switch(type) {
      case ShipType.CORVETTE:
        return this.buildCorvette(name, options)
      case ShipType.BATTLESHIP:
        return this.buildBattleship(name, options)
      case ShipType.DESTROYER:
        return this.buildDestroyer(name, options)
      case ShipType.CRUISER:
        return this.buildCruiser(name, options)
        case ShipType.FISHING:
        return this.buildFishingShip(name, options)
      default:
        throw new Error(`Cannot create a '${type}' class ship.`)
    }
  }

  /**
   * Create a fishing boat. by default it's slow and unarmed
   * @param name Name of the ship
   * @param options Ship options object
   */
  buildFishingShip(name: string, options?: Partial<ShipOptions>): FishingShip {
    return this._build(
      name,
      FishingShip,
      this.normalizeOpts({}, options),
    )
  }
  /**
   * Create a Corvette class military ship.
   * @param name Name of the ship
   * @param options Ship options object
   */
  buildCorvette(name: string, options?: Partial<ShipOptions>): Corvette {
    return this._build(
      name,
      Corvette,
      this.normalizeOpts({
        engine: EngineType.STEAM,
        weapon: WeaponType.TORPEDO,
      }, options),
    )
  }
  /**
   * Create a Destroyer class military ship.
   * @param name Name of the ship
   * @param options Ship options object
   */
  buildDestroyer(name: string, options?: Partial<ShipOptions>): Destroyer {
    return this._build(
      name,
      Destroyer,
      this.normalizeOpts({
        engine: EngineType.DIESEL,
        weapon: WeaponType.TORPEDO,
      }, options),
    )
  }
  /**
   * Create a Cruiser class military ship.
   * @param name Name of the ship
   * @param options Ship options object
   */
  buildCruiser(name: string, options?: Partial<ShipOptions>): Cruiser {
    return this._build(
      name,
      Cruiser,
      this.normalizeOpts({
        engine: EngineType.STEAM,
        weapon: WeaponType.CANNON,
      }, options),
    )
  }
  /**
   * Create a Battleship class military ship.
   * @param name Name of the ship
   * @param options Ship options object
   */
  buildBattleship(name: string, options?: Partial<ShipOptions>): Battleship {
    return this._build(
      name,
      Battleship,
      this.normalizeOpts({
        engine: EngineType.NUCLEAR,
        weapon: WeaponType.MISSILE,
      }, options),
    )
  }

  /**
   * Actual factory method that creates the ships using all the options and stuff
   * injected on previous calls.
   */
  private _build(name: string, Cls: ShipConstructor, options?: Partial<ShipOptions>): Ship {
    return new Cls(
      name,                           // _name field
      Vendors.PartsVendor.getInstance(),    // ship's parts provider
      this.normalizeOpts(options),    // ship construction options
    )
  }

  /**
   * Execute some merging between actual base default values, default values from each
   * factory method and provided values to the method call in order to create a full
   * interface compliant object to give to the ships so that they can create their
   * components.
   */
  private normalizeOpts(defaults: Partial<ShipOptions>, extra: Partial<ShipOptions> = {}): ShipOptions {
    return {
      engine: EngineType.SAILS,
      weapon: WeaponType.UNARMED,
      ...defaults,
      ...extra
    }
  }

}

export default Shipyard
