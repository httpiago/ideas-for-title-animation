/**
 * Pause the code for some time.
 * @returns {Promise}
 */
export function sleep(durationInMs: number) {
  return new Promise(resolve => setTimeout(resolve, durationInMs))
}

/**
 * Traversing the items of an array with a short time interval between each one.
 * @returns {Promise} Returns a promise that resolves on the end of the interaction.
 */
export function loopWithDelay<U>(items: U[], delayInMs: number, callback: (letter: U, index: number) => void) {
  return new Promise((resolve) => {
    let index = 0

    let loop = setInterval(() => {
      const currentItem = items[index]

      callback(currentItem, index)

      if (index >= items.length-1) {
        clearInterval(loop)
        resolve();
      }
      else index++
    }, delayInMs)
  })
}
