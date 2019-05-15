const sections = document.querySelectorAll('section')!
const navigation = document.querySelector('nav.navigation ul')!

// Create a link for each session in the navigation menu
sections.forEach(section => {
  const li = document.createElement('li')
  const link = document.createElement('a')
  link.href = `/#${section.id}`
  link.innerText = section.id

  li.append(link)
  navigation.append(li)
})