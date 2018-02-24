import { Entity } from '../entities'

/**
 * A Shipyard is capable of producing various types of ships
 */
export interface GameEntityFactory<E = any, EOptions = any, Types = any> {
  /**
   * Build a new Ship of the required class, optionally overriding the defaults
   * ship parts in it.
   * If the type is not defined a random ship class from the available ones
   * will be built.
   * @param name Name for the ship
   * @param type The desired ship class
   * @param options Partial ShipOptions to assign to the ship
   */
  build(name: string, type?: Types, options?: EOptions | Partial<EOptions>): E
}

export default GameEntityFactory
