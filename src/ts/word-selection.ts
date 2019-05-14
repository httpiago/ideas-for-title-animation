import scrollMonitor from 'scrollmonitor'
import { sleep, loopWithDelay } from './utils'

const headline = document.querySelector<HTMLElement>('#word-selection h2')!
const originalText = headline.innerText

// Separate each word from title into a own tag
const words = originalText.split(' ')
  .map(word => {
    const node = document.createElement('span')
    node.classList.add('word')
    node.innerText = word

    return node
  })

headline.innerHTML = ''
words.forEach(node => headline.append(node))


const observer = scrollMonitor.create(headline)

observer.enterViewport(async () => {
  await sleep(500)
  
  // Loop through all words with a little delay between each item
  await loopWithDelay(words, 200, (currentWord, index) => {
    try {
      const prevWord = words[index - 1]
      // Remove selection effect on previous word
      prevWord.classList.remove('selected')
    } catch (e) {}

    // Show and create selection effect on word
    currentWord.classList.add('selected')
    currentWord.style.visibility = 'visible'
  })
})

observer.exitViewport(async () => {
  // Reset styles
  [].forEach.call(headline.children, (node: HTMLSpanElement) => {
    node.classList.remove('selected')
    node.style.visibility = ''
  })
})
