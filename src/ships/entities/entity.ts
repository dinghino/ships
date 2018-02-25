import { PartsProvider } from '../parts'

export interface ConcreteEntityConstructor {
  new (name: string, vendor: PartsProvider, options: { [K:string]: any }): Entity
}

/**
 * Base class for all the `primary` entities
 */
export abstract class Entity {
  abstract readonly type: string;
  static EntitiesCount: number = 0

  abstract __entityType: string
  abstract __type: string // Type of entity

  readonly _id: number

  constructor(readonly name: string) {
    this._id = Entity.EntitiesCount++
  }

  get cls() {
    // TODO: Make something better for the entity `class`.
    return this.constructor.name
  }

  abstract move(direction?: string): void
  abstract attack(target?: Entity): void
  abstract setTarget(target: Entity): Entity
  abstract chooseTarget(options: Entity[]): Entity

  abstract hasTarget(): boolean

  get info() {
    return {
      class: this.cls,
      name: this.name,
    }
  }
  /**
   * Serialize the minimum information required to rebuild the object.
   */
  toJSON() {
    return {
      type: this.__type,
    }
  }
}
// export abstract class BaseEntity extends Entity {}

export default Entity
