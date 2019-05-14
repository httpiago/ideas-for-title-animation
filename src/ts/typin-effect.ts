import scrollMonitor from 'scrollmonitor'
import { sleep, loopWithDelay } from './utils'

const headline = document.querySelector<HTMLElement>('#typin-effect h2')!
const originalText = headline.innerText

// Divide the text into two parts, before and after the comma
const phrases = originalText.split(', ').map(str => str.split(''))

headline.innerHTML = ''

const cursor = document.createElement('span')
cursor.className = 'cursor'
headline.append(cursor)

const text = document.createElement('span')
headline.prepend(text)


const observer = scrollMonitor.create(headline)

observer.enterViewport(async () => {
  await sleep(500)

  // Show the first part of the text before the comma
  await loopWithDelay(phrases[0], 60, (letter) => {
    text.innerText += letter
  })

  // Make a dramatic break in the comma
  text.innerHTML += ', <br/>'
  cursor.classList.add('blink')
  await sleep(1500)
  cursor.classList.remove('blink')

  // Show the second part of the text after the comma
  await loopWithDelay(phrases[1], 60, (letter) => {
    text.innerText += letter
  })

  cursor.classList.add('blink')
})

observer.exitViewport(async () => {
  // Reset text
  text.innerHTML = ''
})
