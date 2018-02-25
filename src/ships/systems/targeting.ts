import Entity from '../entities'

export enum TargetingBehaviours {
  ACTIVE = 'ACTIVE',
  NULL = 'NULL'
}

export abstract class Targeting {
  target: Entity

  static TYPE = TargetingBehaviours

  constructor(protected entity: Entity) {}

  isWorking(): boolean { return true }

  abstract chooseTarget(target?: Entity[]): Entity
  abstract setTarget(target: Entity): Entity
  hasTarget(): boolean { return !!this.target }

  static getInstance(owner: Entity, type?: TargetingBehaviours) {
    switch (type) {
      case TargetingBehaviours.ACTIVE:
        return new ActiveTargeting(owner)
      case TargetingBehaviours.NULL:
      default:
        return new NullTargeting(owner)
    }
  }
}

export class ActiveTargeting extends Targeting {
  target: Entity

  chooseTarget(targets?: Entity[]): Entity {
    // remove current ship if present in the options
    targets = targets.filter(target => target !== this.entity)
    const target = targets[Math.floor(Math.random() * targets.length)]
    return this.setTarget(target)
  }
  setTarget(target: Entity): Entity {
    this.target = target
    if (this.target === null) return
    console.log(`[ x ] '${this.entity.name}' is targetting '${target.name}'.`)
    return target
  }
}

/**
 * A NullTargeting is for entities that cannot handle targets, either civilians
 * or entities with 'broken' targeting system
 */
export class NullTargeting extends Targeting {

  /**
   * NullObjects like this do not care about having multiple instances since
   * they do nothing.
   * TODO: Explore the issues that may come from the `entity` property not
   * correctly assigned.
   */
  private static Instance: NullTargeting
  private usedBy: typeof Set

  constructor(entity: Entity) {
    if (NullTargeting.Instance)
      return NullTargeting.Instance

    super(entity)
    NullTargeting.Instance = this
  }
  isWorking() { return false }

  attack(target?: Entity): Entity { return }
  chooseTarget(target?: Entity[]): Entity { return }
  setTarget(target: Entity): Entity { return }
}
