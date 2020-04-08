const startButton = document.getElementById('start-button')
const startScreen = document.getElementById('start-screen')
const gameApp = document.getElementById('game-app')
const gameOverScreen = document.getElementById('game-over')
const victoryScreen = document.getElementById('victory')
const restartButtons = document.querySelectorAll('.restart-button')

restartButtons.forEach((button) =>
  button.addEventListener('click', (event) => {
    console.log('clicky click')
    document.location.reload(false)
  })
)

startButton.addEventListener('click', (event) => {
  startScreen.style.display = 'none'
  gameApp.style.display = 'block'
  app.init()
})
