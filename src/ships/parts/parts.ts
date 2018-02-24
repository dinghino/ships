/**
 * Base interface for all Entity parts
 */
export abstract class Part {
  /**
   * Internal part's discriminator name. Should be unique for each distinct
   * class or set of class (i.e. could be diesel engine, where diesel engines
   * have their own subtypes)
   */
  abstract __type: string
  /**
   * Part information that can be used to display the user stats about the part,
   * log them or access various public properties of the ship from the outside
   */
  abstract info: { [K:string]: any }
  /**
   * JSON Serialization of the ship part, used to rebuild the part from a data
   * structure
   */
  constructor(
  /**
   * Identifier for the actual factory that built the item
   */
    private __manufacturer: string,
    /**
     * Identifier for the part's vendor
     */
    private __vendor: string,
  ) {}

  toJSON(): { [K:string]: any } {
    return {
      type: this.__type,
      manufacturer: this.__manufacturer,
      vendor: this.__vendor,
    }
  }
}

export interface PartsConstructor<PT extends Part> {
  new (manufacturer: string, vendor: string, ...options: any[]): PT
}

export default Part
