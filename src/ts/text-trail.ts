import scrollMonitor from 'scrollmonitor'
import { sleep, loopWithDelay } from './utils'

const headline = document.querySelector<HTMLElement>('#text-trail h2')!
const headlineHeight = headline.getBoundingClientRect().height
const originalText = headline.innerText
const numberOfClones = 6

// Create title clones to put on the main title background
const clonesBefore = Array(numberOfClones).fill(null).map((_, index) => {
  const clone = document.createElement('span')
  clone.style.top = `-${(headlineHeight / 3) * (index+1)}px`
  clone.innerText = originalText

  if (index === 0 || index === 3) clone.classList.add('filled')
  else clone.classList.add('outline')

  if (index === 3) clone.style.zIndex = '3'

  return clone
}).reverse()

const clonesAfter = Array(numberOfClones).fill(null).map((_, index) => {
  const clone = document.createElement('span')
  clone.style.top = `${(headlineHeight / 3) * (index+1)}px`
  clone.innerText = originalText

  if (index === 0 || index === 3) clone.classList.add('filled')
  else clone.classList.add('outline')

  if (index === 3) clone.style.zIndex = '3'

  return clone
})

// Create the main title
headline.innerHTML = ''
const mainTitle = document.createElement('span')
mainTitle.className = 'main outline'
mainTitle.innerText = originalText
headline.append(mainTitle)

// Put clones in the background
clonesBefore.forEach(node => mainTitle.before(node))
clonesAfter.forEach(node => mainTitle.after(node))


const observer = scrollMonitor.create(headline)

observer.enterViewport(async () => {
  await sleep(500)

  // Show the trail of cloned titles, one by one
  var reverseIndex = 5
  await loopWithDelay(clonesBefore, 100, (_, index) => {
    clonesBefore[index].style.visibility = 'visible'
    clonesAfter[reverseIndex].style.visibility = 'visible'
    
    reverseIndex--;
  })

  // Show main title
  mainTitle.style.visibility = 'visible'

  // Hide the trail of cloned titles, one by one
  var reverseIndex = 5
  await loopWithDelay(clonesBefore, 100, (_, index) => {
    clonesBefore[index].style.visibility = 'hidden'
    clonesAfter[reverseIndex].style.visibility = 'hidden'
    
    reverseIndex--;
  })
})

observer.exitViewport(async () => {
  // Reset styles
  [].forEach.call(headline.children, (node: HTMLSpanElement) => {
    node.style.visibility = ''
  })
})
