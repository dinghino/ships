import { Part } from './parts'

/**
 * Base class for a Ship Engine, part required for a ship to move
 */
export abstract class Engine extends Part {
  abstract __type: EngineType
  constructor(
    manufacturer: string,
    vendor: string,
    private _type: string,
    private _power: number,
  ) { super(manufacturer, vendor) }

  /** how much power the engine generates */
  get power() { return this._power }
  /** the power source of the engine */
  get type() { return this._type }

  /** object that describes the engine itself */
  get info(): EngineInfo {
    return {
      name: this._type,
      power: this.power,
    }
  }
}

export interface EngineInfo {
  name: string
  power: number
}

export class Sails extends Engine {
  __type = EngineType.SAILS
  constructor(manufacturer: string, vendor: string) {
    super(manufacturer, vendor, 'Sails', 15)
  }
}

export class SteamEngine extends Engine {
  __type = EngineType.STEAM
  constructor(manufacturer: string, vendor: string) {
    super(manufacturer, vendor, 'Steam engine', 120)
  }
}

export class DieselEngine extends Engine {
  __type = EngineType.DIESEL
  constructor(manufacturer: string, vendor: string) {
    super(manufacturer, vendor, 'Diesel engine', 200)
  }
}

export class NuclearEngine extends Engine {
  __type = EngineType.NUCLEAR
  constructor(manufacturer: string, vendor: string) {
    super(manufacturer, vendor, 'Nuclear engine', 450)
  }
}

export const Engines = {
  Sails,
  SteamEngine,
  DieselEngine,
  NuclearEngine,
}

export enum EngineType {
  SAILS = 'SAILS',
  STEAM = 'STEAM',
  DIESEL = 'DIESEL',
  NUCLEAR = 'NUCLEAR',
}

