const resizeGame = (configWidth, configHeight) => {
  //width-height ration of game resolution
  let WHRatio = configWidth / configHeight  //0,5625, this is the value of this game in particular. It might be better to extract this from game.config.width and height
  let deviceWidth = window.innerWidth
  let deviceHeight = window.innerHeight

  let resizeToFullHeight = deviceWidth / deviceHeight > WHRatio

  //WHRatio of device's screens, and what happens when you try to fit a game 360 / 640:
  //Moto G4 0,5625 - perfect
  //galaxy S5 0,5625 - perfect
  // pixel 2 0,5622 - perfect
  // pixel 2 XL 0,4993 - width is the limiting
  //iPhone 6/7/8 0.5622 - perfect
  //iphone 6/7/8 plus 0,5625 - perfect
  //iphone 5/SE 0,5633 - perfect
  //iphone X 0,4618 - width is the limiting
  //ipad 0,75 - height is the limiting
  //ipad Pro 0,749 - height is the limiting
  //surface Duo 0,75 - height is the limiting
  //galaxy fold 0,42- width is the limiting

  //Making parent element and canvas element of the game full width or full height, depending what will keep the ratio and show all the game.
  let divParentElement = document.getElementById("phaser-app")
  let canvasElement = divParentElement.getElementsByTagName("canvas")[0]

  if (resizeToFullHeight) {
    divParentElement.style.width = (deviceHeight * WHRatio) + "px"
    divParentElement.style.height = deviceHeight + "px"
    canvasElement.style.width = (deviceHeight * WHRatio) + "px"
    canvasElement.style.height = deviceHeight + "px"
  } else {
    divParentElement.style.width = deviceWidth + "px"
    divParentElement.style.height = (deviceWidth / WHRatio) + "px"
    canvasElement.style.width = deviceWidth + "px"
    canvasElement.style.height = (deviceWidth / WHRatio) + "px"
  }
}

export default resizeGame