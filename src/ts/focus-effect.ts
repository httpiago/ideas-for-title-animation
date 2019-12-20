import scrollMonitor from 'scrollmonitor'

const headline = document.querySelector<HTMLElement>('#focus-effect h2')!


const observer = scrollMonitor.create(headline)

observer.enterViewport(() => {
  headline.classList.add('visible')
})

observer.exitViewport(() => {
  headline.classList.remove('visible')
})
