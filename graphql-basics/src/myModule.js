const message = 'Some message from myModule.js'
const name = 'Dom Hallan'
const city = 'STL'

const getGreeting = name => {
  return(`Hello, ${name}!`)
}

export{ message, name, getGreeting, city as default }