import { WeaponType, WeaponInfo, Weapon } from './weapons'
import { EngineType, EngineInfo, Engine } from './engines'
import { TanksType, FuelTankInfo, FuelTank } from './fuelTanks'

import { PartsProvider, PartsVendor } from './vendors'

export {
  // Enum for item selections
  WeaponType,
  EngineType,
  TanksType,
  // Interfaces for info objects and items
  WeaponInfo, Weapon,
  EngineInfo, Engine,
  FuelTankInfo, FuelTank,
  // Parts factory interface
  PartsProvider,
  // Actual implementation for a PartsProvider
  PartsVendor,
}
