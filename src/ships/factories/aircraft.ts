import GameEntityFactory from './factory'
import { PartsVendor, TanksType, WeaponType, EngineType } from '../parts'

import {
  Aircraft,
  Aircrafts,
  AircraftOptions,
  AircraftType,
  AircraftConstructor
} from '../entities/aircrafts'

// import 

export class AircraftFactory implements GameEntityFactory<Aircraft, AircraftOptions, AircraftType> {
  
  static defaultOptions: AircraftOptions = {
    engine: EngineType.DIESEL,
    weapon: WeaponType.MISSILE,
    fuelTank: TanksType.FUEL_TANK,
    tankOptions: { capacity: 200 },
  }
  /**
   * Build a new Ship of the required class, optionally overriding the defaults
   * ship parts in it.
   * If the type is not defined a random ship class from the available ones
   * will be built.
   * @param name Name for the ship
   * @param type The desired ship class
   * @param options Partial ShipOptions to assign to the ship
   */
  build(name: string, type?: AircraftType, options?: Partial<AircraftOptions>): Aircraft {
    let Cls: AircraftConstructor
    switch(type) {
      case AircraftType.FIGHTER:
        Cls = Aircrafts.Fighter; break
      case AircraftType.BOMBER:
        Cls = Aircrafts.Bomber; break
      default:
        throw new Error(`Cannot create an aircraft of type ${type}.`)
    }
    return new Cls(
      name,
      PartsVendor.getInstance(),
      {...AircraftFactory.defaultOptions, ...options},
    )
  }
}

export default AircraftFactory
