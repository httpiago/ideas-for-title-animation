import scrollMonitor from 'scrollmonitor'
import { sleep, loopWithDelay } from './utils'

const headline = document.querySelector<HTMLElement>('#sliding-letters h2')!
const headlineHeight = headline.getBoundingClientRect().height + 'px'

const letters = headline.innerText.split('')
  .map(letter => {
    const node = document.createElement('span')
    node.className = 'letter'
    node.style.top = headlineHeight
    node.innerText = letter

    return node
  })

// Replace each letter by a tag
headline.innerHTML = ''
letters.forEach(node => headline.append(node))


const observer = scrollMonitor.create(headline)

observer.enterViewport(async () => {
  await sleep(500)

  // Show all letters with a little delay in each.
  await loopWithDelay(letters, 25, (node) => {
    node.style.top = '0px'
  })
})

observer.exitViewport(async () => {
  // Reset styles
  letters.forEach((node) => {
    node.style.top = headlineHeight
  })
})
