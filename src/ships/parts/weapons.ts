import Part from './parts'
import Entity from '../entities'


export enum WeaponType {
  UNARMED = 'UNARMED',
  MISSILE = 'MISSILE',
  TORPEDO = 'TORPEDO',
  CANNON = 'CANNON',
}

/**
 * Base class for all the Entity weapon systems
 */
export abstract class Weapon extends Part {

  static TYPE = WeaponType

  abstract __type: WeaponType
  protected _usable = true

  constructor(
    manufacturer: string,
    vendor: string,
    private _name: string,
    private _damage: number,
    private _range: number,
  ) { super(manufacturer, vendor) }

  get name() { return this._name }
  get damage() { return this._damage }
  get range() { return this._range }
  /**
   * This is a getter and not a static property because we'll add
   * sooner than later stuff like ammunitions or quantity
   * that will be used to decide if a weapon is usable or not.
   */
  get usable() { return this._usable }

  fire(owner: Entity, target: Entity): boolean {
    if (this._usable) {
      console.log(`[ + ] The '${owner.name}' fires to the '${target.name}' with its ${this.name}.`)
      return true
    } else
      console.log(`[ ° ] The '${owner.name}' does not have weapons to use.`)

    return false
  }

  get info(): WeaponInfo {
    return {
      name: this.name,
      damage: this.damage,
      range: this.range,
      usable: this._usable,
    }
  }
}

export interface WeaponInfo {
  name: string
  damage: number
  range: number
  usable: boolean,
}

export class Unarmed extends Weapon {
  __type = WeaponType.UNARMED
  protected _usable = false

  constructor(manufacturer: string, vendor: string) {
    super(manufacturer, vendor, 'No weapons', 0, 0)
  }
}

export class Cannon extends Weapon {
  __type = WeaponType.CANNON
  constructor(manufacturer: string, vendor: string) {
    super(manufacturer, vendor, 'Cannon', 5, 15)
  }
}

export class Torpedo extends Weapon {
  __type = WeaponType.TORPEDO
  constructor(manufacturer: string, vendor: string) {
    super(manufacturer, vendor, 'Torpedo', 8, 30)
  }
}

export class Missile extends Weapon {
  __type = WeaponType.MISSILE
  constructor(manufacturer: string, vendor: string) {
    super(manufacturer, vendor, 'Missile', 10, 50)
  }
}

export const Weapons = {
  Unarmed,
  Cannon,
  Torpedo,
  Missile,
}
