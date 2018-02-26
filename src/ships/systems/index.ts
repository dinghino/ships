import { Targeting, TargetingBehaviours } from './targeting'
import { MovingStrategy, MovingBehaviours } from './moving'
export {
  Targeting, TargetingBehaviours,
  MovingStrategy, MovingBehaviours,
}

export const Strategy = {
  Targeting,
  Moving: MovingStrategy
}

export default Strategy
