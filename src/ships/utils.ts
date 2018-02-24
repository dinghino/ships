
/**
 * returns one random element from the provided array
 * @param source Array of any kind of data
 */
export function random<T>(source: T[]): T {
  return source[Math.floor(Math.random() * source.length)]
}

/**
 * Get one random key from an object, with all properties of the same type
 * mantaining type inference from the array.
 * @param object Javascript object
 */
function enumRandomKey<T>(object: T): keyof T {
  const keys = <Array<keyof T>> Object.keys(object)
  return random(keys)
}

/**
 * Extract one random element from the provided Enum maintaning return type.
 * Allows to select one random element from an enum and pass it around normally
 * @param enumObject Typescript `enum` object
 */
export function randomType<T>(enumObject: T): T[keyof T] {
  return enumObject[enumRandomKey(enumObject)];
}
