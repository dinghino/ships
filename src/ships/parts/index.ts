import { WeaponType, WeaponInfo, Weapon } from './weapons'
import { EngineType, EngineInfo, Engine } from './engines'
import { PartsProvider, PartsVendor } from './vendors'

export {
  // Enum for item selections
  WeaponType,
  EngineType,
  // Interfaces for info objects and items
  WeaponInfo, Weapon,
  EngineInfo, Engine,
  // Parts factory interface
  PartsProvider,
  // Actual implementation for a PartsProvider
  PartsVendor,
}
