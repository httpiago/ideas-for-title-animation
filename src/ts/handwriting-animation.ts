import scrollMonitor from 'scrollmonitor'
import lottie from 'lottie-web'
import { sleep } from './utils';

const logoTag = document.querySelector('#handwriting-animation #bodymovin')

/**
 * @see https://github.com/airbnb/lottie-web
 */
const animation = lottie.loadAnimation({
  container: logoTag,
  path: 'bullet-journal-logo-animation-data.json',
  renderer: 'svg',
  loop: false,
  autoplay: false,
  name: 'Bullet Journal'
})


const observer = scrollMonitor.create(logoTag)

observer.enterViewport(async () => {
  await sleep(300)

  // Play animation
  animation.goToAndPlay(0)
})

observer.exitViewport(async () => {
  // Stop animation
  animation.goToAndStop(0)
})
