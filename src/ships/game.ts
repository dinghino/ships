import Ship, { ShipType, ShipOptions } from './entities/ships'
import Aircraft, { AircraftOptions, AircraftType } from './entities/aircrafts'

import { Shipyard, AircraftFactory, GameEntityFactory } from './factories'
import { WeaponType, EngineType } from './parts'

import Entity from './entities'

import * as utils from './utils'

export class Game {
  private shipyard: GameEntityFactory<Ship, ShipOptions, ShipType>
  private aircraftFactory: GameEntityFactory<Aircraft, AircraftOptions, AircraftType>

  entities: Entity[]

  constructor(private _name: string, setup?: boolean) {
    this.entities = []
    this.shipyard = new Shipyard()
    this.aircraftFactory = new AircraftFactory()

    if (setup) this.setup()
  }

  private setup() {
    console.log(`Creating "${this._name}" game.`)

    this.entities.push(
      this.createShip('USS Constellation', ShipType.CORVETTE),
      this.createShip('HMS Pembroke', ShipType.CORVETTE),
      this.createShip('HMS Swordfish', ShipType.DESTROYER),
      this.createShip('USS Ticonderoga', ShipType.CRUISER),
      this.createShip('USS Maine', ShipType.BATTLESHIP),
      // add also a powerful destroyer, specifying custom parts for it...
      this.shipyard.build('Super destroyer', ShipType.DESTROYER, {
        weapon: WeaponType.MISSILE,
        engine: EngineType.NUCLEAR,
      }),
      // ...a random ship. with default parts for the random type..
      this.shipyard.build('Random ship'),
      // ...a random powerful ship of any kind...
      this.shipyard.build('HMS Powerful', null, {
        weapon: WeaponType.MISSILE,
        engine: EngineType.NUCLEAR
      }),
      // ...and a tiny fishing boat, just for the lulz. Poor guys :( ...
      this.shipyard.build('Narwhal\'s demon', ShipType.FISHING)
    )

    // add some aircraft
    this.entities.push(
      this.aircraftFactory.build('B52', AircraftType.BOMBER),
      this.aircraftFactory.build('Falcon', AircraftType.FIGHTER)
    )

    console.log(`Game "${this._name}" is ready.`)
    console.log(`${this.entities.length} ships are sailing the seas.`)
    console.log(`${this.entities.length} aircrafts are flying above.`)
  }
  createShip(name: string, type?: ShipType, options?: Partial<ShipOptions>): Ship {
    return this.shipyard.build(name, type, options)
  }

  createAircraft(name: string, type?: AircraftType, options?: Partial<AircraftOptions>): Aircraft {
    return this.aircraftFactory.build(name, type, options)
  }

  addEntity(...entities:Entity[]): void {
    this.entities = this.entities.concat(entities)
  }

  run() {
    console.log('\n...The game is afoot.\n')
    this.entities.forEach(entity => {
      if (Math.random() > 0.3) entity.chooseTarget(this.entities)
      else console.log(`[ - ] The '${entity.name}' did not found a viable target.`)
    })

    console.log()
    this.entities.forEach(entity => {
      if (entity.hasTarget() && Math.random() > .8) entity.attack()
      else entity.move()
    })
  }

  debug() {
    console.log('\n\n\n\n\n')
    this.entities.forEach(ent => {
      console.log(`=== ${ent.type} ${ent.cls}: ${ent.name}`)
      console.log('Entity DATA:', ent.toJSON())
      console.log('Entity INFO:', ent.info)
      console.log('\n\n')
    })

  }
}

export default Game
