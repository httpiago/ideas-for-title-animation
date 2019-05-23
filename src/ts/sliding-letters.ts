import scrollMonitor from 'scrollmonitor'
import Odometer from 'odometer'
import { sleep, loopWithDelay } from './utils'

const headline = document.querySelector<HTMLElement>('#sliding-letters h2')!
const headlineText = headline.querySelector<HTMLElement>('.text')!
const headlineHeight = headline.getBoundingClientRect().height + 'px'
const duration = 250

const letters = headlineText.innerText.split('')
  .map(letter => {
    const node = document.createElement('span')
    node.className = 'letter'
    node.style.top = headlineHeight
    node.innerText = letter

    return node
  })

const bgNumber = new Odometer({
  el: headline.querySelector('.background-number')!,
  value: new Date().getFullYear(),
  format: '',
  duration
})

// Replace each letter by a tag
headlineText.innerHTML = ''
letters.forEach(node => headlineText.append(node))


const observer = scrollMonitor.create(headline)

observer.enterViewport(async () => {
  await sleep(500)

  // Do the odometer update the background number
  bgNumber.update(1902)

  // Show all letters with a little delay in each.
  await loopWithDelay(letters, (1000 / letters.length), (node) => {
    node.style.top = '0px'
  })
})

observer.exitViewport(async () => {
  // Reset styles
  letters.forEach((node) => {
    node.style.top = headlineHeight
  })
  bgNumber.update(new Date().getFullYear())
})
