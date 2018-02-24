# Ships

This project is built to test various design patterns in a `typescript (2.7+)` environment as a diversion. Won't probably bring it up to something usable, but it could be a nice example on how various patterns can be used in typescript.

## Getting started

Clone the project, then using npm or yarn install the dependecies, then explore the content.
For now the main entity is the `Game` class that on creation creates a bunch of various ships.

There is no game loop or anything, just one _round_ when the game is set created passing a `true` flag (see below).
The idea was - for now - to familiarize on how to work with some patterns, as stated before, so nothing uber fancy.

## Testing

No tests available at the moment, but I'm planning on setting them up.


## Make it work

To get a sample of the game running

```typescript
import Game, { ShipType } from './ships'

// allow to build some sample stuff for testing by passing true.
// Will be removed later on.
const game = new Game('Your game title', true)
game.run()
```

You can also create and add ships to the game, either default
When creating a ship you can specify custom options for it.
For now only some engines and weapons are available

```typescript
import Game, { ShipType, WeaponType, EngineType } from './ships'

const game = new Game('Your game title')

// a ship with a random class and its default parts.
const randomShip = game.createShip('random ship')

// create a default corvette
const simpleCorvette = game.createShip('Ship name', ShipType.CORVETTE)

// completely custom ship
const awesomeCorvette = game.createShip('Ship name', ShipType.CORVETTE, {
    engine: EngineType.NUCLEAR,
    weapon: WeaponType.MISSILE,
})

// or create an array and spread it. works anyway
game.addEntity(randomShip, simpleCorvette, awesomeCorvette)
```

The same can be done with aircrafts

```typescript
import Game, { AircraftType, WeaponType, EngineType } from './ships'

const game = new Game('Your game title')
const player = game.createAircraft('A Plane')
game.addEntity(player)
```

### Log some info

Each ship can be logged out in its glory with and can also be serialized for future reconstruction.

```typescript
const randomShip = game.createShip('random ship')
console.log(ship.info)      // logs the curren status of the ship and its parts
console.log(ship.toJSON())  // log the info required to rebuild the ship (not implemented yet)
```

the `info` property can also be used to generate some kind of UI since it contains lots of user-friendly information about the ship itself.


### Shipyards, Ships creation and actors
> How this works, for posterity.

The game's `createShip(...)` and `createAircraft(...)` methods is just a mediator for the actual ship and aicraft factories that are actually in charge of creating the entieis with all the proper gimmicks.

The actual actors involved are

* **GameEntityFactories** (found for in `src/ships/factories/`) are the ones responsible on building the game entities, deciding what class instanciate, what kind of parts it needs and from which _vendor_ they come from. The default Factory is the `Shipyard`.

* **PartsVendor**s (found in `src/ships/parts/vendors`) role is to provide parts to a caller and acts like a greedy shopkeeper that works between the `Ship`s and the actual parts builders, allowing the entities to _buy_ all the pieces in one place.

* **PartsFactory** (found in `src/ships/parts/factories`) objects, on the other hand, are the actual factories that build the parts (engines, weapons etc) and are specialized on a single type of part.
  Each entity part also keep track of what it is and where it was produced and _bought_ from, because why not.

* **Entities** Finally, the entities are all the main actors that can do actions, so Ships, Aircrafts, People and so on.... They get