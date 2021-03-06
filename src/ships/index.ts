import Game from './game'

import Entity, { Aircraft, Ship } from './entities'

import { ShipType, ShipOptions } from './entities/ships'
import { AircraftType, AircraftOptions } from './entities/aircrafts'

import { WeaponType, EngineType, Engine, Weapon } from './parts'

import Strategy from './systems'


export {
  Entity,
  Ship, ShipType, ShipOptions,
  Aircraft, AircraftType, AircraftOptions,
  Engine, WeaponType,
  Weapon, EngineType,
  Strategy,
}

export default Game
