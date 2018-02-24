/**
 * Test playground
 */
import Game, { ShipType, EngineType, WeaponType } from './ships'

const game = new Game('Awesome game ship')

// // create a random ship
// const randomShip = game.createShip('Random ship')

// // create a default corvette
// const simpleCorvette = game.createShip('Simple Corvette', ShipType.CORVETTE)

// // completely custom ship
// const awesomeCorvette = game.createShip('Awesome corvette', ShipType.CORVETTE, {
//     engine: EngineType.NUCLEAR,
//     weapon: WeaponType.MISSILE,
// })

// Add them to the game
// game.addEntity(randomShip, simpleCorvette, awesomeCorvette)

// See what happens.
// game.run()
game.debug()
