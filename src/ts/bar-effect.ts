import scrollMonitor from 'scrollmonitor'
import { sleep } from './utils'

const headline = document.querySelector<HTMLElement>('#bar-effect h2')!
const bar = headline.querySelector<HTMLElement>('.bar')!
const text = headline.querySelector<HTMLElement>('.text')!


const observer = scrollMonitor.create(headline)

observer.enterViewport(async () => {
  await sleep(500)

  // Animate the bar
  bar.style.width = '100%'

  await sleep(500)

  text.style.visibility = 'visible'
  // Hide the bar with animation to reveal the text
  bar.style.width = '0%'
  bar.style.right = 'initial'
  bar.style.left = '0px'
})

observer.exitViewport(async () => {
  // Reset styles
  bar.setAttribute('style', '')
  text.setAttribute('style', '')
})
