const startButton = document.getElementById("start-button")
const startScreen = document.getElementById("start-screen")
const gameApp = document.getElementById("game-app")

startButton.addEventListener("click", event => {
  startScreen.style.display = "none"
  gameApp.style.display = "block"
  app.init()
})
