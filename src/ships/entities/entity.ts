import { PartsProvider } from '../parts'

import { Targeting, TargetingBehaviours } from '../systems'

export interface ConcreteEntityConstructor {
  new (name: string, vendor: PartsProvider, options: { [K:string]: any }): Entity
}

/**
 * Base class for all the `primary` entities
 */
export abstract class Entity {
  static EntitiesCount: number = 0

  abstract readonly type: string
  abstract __entityType: string
  abstract __type: string // Type of entity
  readonly _id: number

  protected targeting: Targeting

  constructor(readonly name: string) {
    this._id = Entity.EntitiesCount++
  }

  get cls() { // TODO: Make something better for the entity `class`.
    return this.constructor.name
  }

  // Actions -----------------------------------------------------------------

  abstract move(direction?: string): void
  abstract attack(target?: Entity): void

  // Targeting ---------------------------------------------------------------

  /**
   * Change the targeting system behaviour.
   * If nothing is provided it will default to not be able to get targets
   * @param system either an instance of a TargetingSystem or a TargettingBehaviour (string)
   */
  setTargetingSystem(system?: Targeting): this
  setTargetingSystem(system?: TargetingBehaviours): this
  setTargetingSystem(system?: Targeting | TargetingBehaviours): this {
    if (system instanceof Targeting) this.targeting = system
    else this.targeting = Targeting.getInstance(this, system || Targeting.TYPE.NULL)
    return this
  }

  canSelectTargets(): boolean { return this.targeting.isWorking() }

  protected get target(): Entity { return this.targeting.target }

  hasTarget(): boolean {
    return this.targeting.hasTarget()
  }
  setTarget(target: Entity): Entity {
    return this.targeting.setTarget(target)
  }
  chooseTarget(targets: Entity[]): Entity {
    return this.targeting.chooseTarget(targets)
  }


  // Output methods ----------------------------------------------------------

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
