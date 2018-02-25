import { Part } from './parts'

/**
 * A Fuel tank contains and provide fuel.
 * A new FuelTank is always full.
 */
export class FuelTank extends Part {
  __type: TanksType.FUEL_TANK

  private fuel: FuelState

  constructor(
    /** who built the fuel tank */
    manufacturer: string,
    /** who sold the fuel tank */
    vendor: string,
    /** fuel tank maximum capacity */
    public capacity: number
  ) {
    super(manufacturer, vendor)
    this.fuel = FuelState.getFull(this)
  }

  /** Current fuel quantity in the tank */
  get currentFuel(): number { return this.fuel.quantity }

  isEmpty() { return !this.hasFuel() }
  isFull() { return this.hasFuel(this.capacity) }
  /** Check that the tank has at least <qty> of fuel inside */
  hasFuel(qty = 1): boolean { return this.currentFuel >= qty }

  /**
   * add some fuel to the tank
   * @return Amount of fuel actuall added
   */
  addFuel(amount: number): number {
    return this.fuel.add(amount)
  }
  /**
   * request some fuel to the tank.
   * @return The actual quantity of fuel returned. Can be lower than what
   *         requested if the tank has less fuel
   */
  getFuel(amount: number): number {
    return this.fuel.remove(amount)
  }

  changeState(state: FuelState) { this.fuel = state }

  get info() {
    return {
      capacity: this.capacity,
      currentFuel: this.currentFuel
    }
  }
  toJSON() {
    return {
      ...super.toJSON()
    }
  }
}

/**
 * Abstract FuelState class
 */
export abstract class FuelState {
  protected constructor(
    /** FuelTank object that contains this fuel */
    protected tank: FuelTank,
    /** actual amount of fuel available */
    public quantity: number
  ) {}

  /**
   * Take some fuel back from the pool
   * @param amount how much fuel we need
   * @return how much fuel we actuall get back. Can be less than what requested
   */
  abstract remove(amount: number): number
  /**
   * Add some fuel to the pool
   * @param amount How much fuel we are trying to add
   * @return How much fuel gets rejected from the fuel pool. Can be > 0 if the
   *         added quantity is higher than the max fuel capacity.
   */
  abstract add(amount: number): number

  static getFull(tank: FuelTank, quantity = tank.capacity) {
    return new FullTank(tank, quantity)
  }
  static getEmpty(tank: FuelTank) {
    return new EmptyTank(tank, 0)
  }
  static getinfinite(tank: FuelTank) {
    return new InfiniteTank(tank, 100000) // the number does not matter since it won't be removed
  }
}

/**
 * The standard Tank behaviour, can be requested fuel - and will give it up to
 * the available quantity - and will transition to an EmptyTank when the stored
 * fuel ends.
 */
export class FullTank extends FuelState {
  remove(amount: number) {
    let removed = amount
    if (amount > this.quantity) removed = this.quantity
    this.quantity -= removed
    // change the tank state to empty since there is no more fuel
    if (this.quantity <= 0)
      this.tank.changeState(FuelState.getEmpty(this.tank))
    return removed
  }
  add(amount: number) {
    let added = amount
    // how much fuel can be added to the tank
    let availableSpace = this.tank.capacity - this.quantity
    if (amount >= availableSpace) added = amount - availableSpace

    this.quantity += added
    return amount - added
  }
}

/**
 * An Empty fuel tank, being empty, can only be filled with fuel and won't give
 * back any fuel when requested. Will transition to a FullTank when some fuel
 * is added (with the proper amount of fuel in it)
 */
export class EmptyTank extends FuelState {
  remove(amount: number) { return 0 }
  add(amount: number) {
    if (amount <= 0) return amount

    this.tank.changeState(FuelState.getFull(this.tank, amount))
    return amount
  }
}

/**
 * An infinite fuel tank is able to handle any quantity of fuel and always
 * returns the requested fuel
 */
export class InfiniteTank extends FuelState {
  remove(amount: number): number {
    return amount
  }
  add(amount: number): number {
    return amount
  }
}

export const FuelTanks = {
  FuelTank,
}

export enum TanksType {
  FUEL_TANK = 'Fuel Tank',
}


/**
 * A 'Standard' implementation with the Proxy pattern whould look like following,
 * but has the huge disadvantage that the behaviour of the tank cannot be changed
 * with something different (like the InfiniteTank) since the actual implementation
 * is embedded in the Tank itself and so it's static, so even though there is
 * more code to handle, it's more dynamic and on the client it won't change
 * anything.
 *
 * I Left out the actual Part super class implementation for simplicity but
 * in an actual implementation it would be there
 * ---------------------------------------------------------------------------
 *
 * export class ProxiedFuelTank {
 *   private _fuelQty: number
 * 
 *   constructor(readonly capacity: number) {}
 *
 *   get fuelQuantity() { return this._fuelQty }
 *   get isEmpty(): boolean { return !this.hasFuel() }
 *   get isFull(): boolean { return this.hasFuel(this.capacity) }
 *   hasFuel(quantity = 1) { return this._fuelQty >= quantity }
 * 
 *   getFuel(amount: number): number {
 *     let output = amount
 *     if (amount > this._fuelQty) output = this._fuelQty
 *     this._fuelQty -= output
 *     return output
 *   }
 *   addFuel(amount:number): number {
 *     let input = amount
 *     const space = this.capacity - this._fuelQty
 *     if (amount > space) input = space
 *     this._fuelQty += input
 *     return amount - input
 *   }
 * }
 */
