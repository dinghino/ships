import { Engine, EngineType, Engines } from './engines'
import { Weapon, WeaponType, Weapons } from './weapons'

import { Part, PartsConstructor } from './parts'

import * as utils from '../utils'

export abstract class PartsFactory<T extends Part> {
  abstract __factoryName: string

  constructor(
    private classes: { [K: string]: PartsConstructor<T> },
    readonly availableParts: string[] = Object.keys(classes),
  ) {
  }

  create(type: string, vendor: string, ...options: any[]): T {
    try {
      return new (this.classes[type])(
        this.__factoryName,
        vendor,
        options
      )
    } catch (error) {
      throw new TypeError(`Cannot find item ${type} in our factories. :(`)
    }
  }
}

export interface PartsFactoryConstructor<T extends Part> {
  getInstance(): PartsFactoryConstructor<T>
}

export class WeaponsFactory extends PartsFactory<Weapon> {
  __factoryName = Manufacturer.WEAPONS_FACTORY
  static __instance: WeaponsFactory
  
  static getInstance(): WeaponsFactory {
    if (!this.__instance) this.__instance = new WeaponsFactory()
    return this.__instance
  }

  protected constructor() {
    super({
      [WeaponType.CANNON]: Weapons.Cannon,
      [WeaponType.TORPEDO]: Weapons.Torpedo,
      [WeaponType.MISSILE]: Weapons.Missile,
      [WeaponType.UNARMED]: Weapons.Unarmed,
    })
  }
}

export class EnginesFactory extends PartsFactory<Engine> {
  __factoryName = Manufacturer.ENGINES_FACTORY
  static __instance: EnginesFactory
  
  static getInstance(): EnginesFactory {
    if (!this.__instance) this.__instance = new EnginesFactory()
    return this.__instance
  }
  protected constructor() {
    super({
      [EngineType.SAILS]: Engines.Sails,
      [EngineType.STEAM]: Engines.SteamEngine,
      [EngineType.DIESEL]: Engines.DieselEngine,
      [EngineType.NUCLEAR]: Engines.NuclearEngine,
    })
  }
}


export enum Manufacturer {
  WEAPONS_FACTORY = 'Luthor Corp',
  ENGINES_FACTORY = 'Wayne Tech inc.',
}