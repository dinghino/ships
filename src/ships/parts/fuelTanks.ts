import { Part } from './parts'

/**
 * A Fuel tank contains and provide fuel.
 * A new FuelTank is always full.
 */
export class FuelTank extends Part {
  __type: TanksType.FUEL_TANK

  private fuel: FuelState

  constructor(manufacturer: string, vendor: string, public capacity: number) {
    super(manufacturer, vendor)
    this.fuel = FuelState.getFull(this)
  }
  /** Current fuel quantity in the tank */
  get currentFuel(): number { return this.fuel.quantity }
  /** true if the tank has no fuel */
  isEmpty() { return this.currentFuel === 0 }
  /** Check that the tank has at least <qty> of fuel inside */
  hasFuel(qty = 0): boolean { return this.currentFuel > qty }

  /**
   * add some fuel to the tank
   * @return Amount of fuel actuall added
  */
  refuel(amount: number): number {
    return this.fuel.add(amount)
  }
  /**
   * request some fuel to the tank.
   * @return The actual quantity of fuel returned. Can be lower than what
   *         requested if the tank has less fuel
  */
  get(amount: number): number {
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
}

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

export class EmptyTank extends FuelState {
  remove(amount: number) { return 0 }
  add(amount: number) {
    if (amount <= 0) return amount

    this.tank.changeState(FuelState.getFull(this.tank, amount))
    return amount
  }
}

export const FuelTanks = {
  FuelTank,
}

export enum TanksType {
  FUEL_TANK = 'Fuel Tank',
}
