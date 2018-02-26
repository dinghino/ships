import Entity from '../entities'

export enum MovingBehaviours {
  FLY = 'FLY',
  SAIL = 'SAIL',
  STATIC = 'STATIC'
}

/**
 * A MovingStrategy defines how an entity moves around or stay still if needed.
 */
export abstract class MovingStrategy {
  static TYPE = MovingBehaviours
  speed: number = 0

  constructor(protected entity: Entity) {}

  abstract move(direction?: string): void
  canMove(): boolean { return true }

  static getInstance(owner: Entity, type?: MovingBehaviours): MovingStrategy {
    switch(type) {
      case MovingBehaviours.FLY:
        return new MoveFlying(owner)
      case MovingBehaviours.SAIL:
        return new MoveSailing(owner)
      case MovingBehaviours.STATIC:
      default:
        return new DoNotMove(owner)
    }
  }
}

/**
 * Base moving strategy for flying entities
 */
export class MoveFlying extends MovingStrategy {
  move(direction?: string): void {
    // TODO: Get speed somehow
    const ent = this.entity
    const speed = ` at ${ent.topSpeed} mph`

    if (direction)
      console.log(`[ > ] The ${ent.name} is flying ${direction} ${speed}.`)
    else if (ent.hasTarget())
      console.log(`[ ! ] The '${ent.name}' is flying toward the '${ent.target.name}' ${speed}.`)
    else
      console.log(`[ ? ] The '${ent.name}' is flying around. ${speed}.`)
  }
}

/**
 * Base moving strategy for naval entities
 */
export class MoveSailing extends MovingStrategy {
  move(direction?: string): void {
    // TODO: Get speed somehow
    const ent = this.entity
    const speed = `at ${ent.topSpeed} mph`

    if (direction)
      console.log(`[ > ] The ${ent.name} is moving ${direction} ${speed}.`)
    else if (ent.hasTarget())
      console.log(`[ ! ] The '${ent.name}' is moving toward the '${ent.target.name}' ${speed}.`)
    else
      console.log(`[ ? ] The '${ent.name}' is moving in a search pattern ${speed}.`)
  }
}

/**
 * Base moving strategy for all entities.
 */
export class DoNotMove extends MovingStrategy {
  canMove() { return false }
  // TODO: Implement as singleton and return null
  move(direction?: string): void {
    return console.log(`[   ] ${this.entity.name} cannot move.`)
  }
}

export default MovingStrategy
