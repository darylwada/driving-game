class Car {
  constructor($img, speed, direction, location) {
    this.$img = $img
    this.speed = speed
    this.direction = direction
    this.location = location
  }
  turn(direction) {
    this.direction = direction
    this.$img.className = direction
  }
  move() {
    switch (this.direction) {
      case 'north':
        this.location[1] += this.speed
        break
      case 'south':
        this.location[1]-= this.speed
        break
      case 'east':
        this.location[0] += this.speed
        break
      case 'west':
        this.location[0] -= this.speed
    }
  }
}

var $img = document.createElement('img')
$img.src = 'car-top-down.png'
document.body.appendChild($img)

var car = new Car($img, 1, 'east', [0, 0])

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      car.turn('north')
      break
    case 'ArrowDown':
      car.turn('south')
      break
    case 'ArrowRight':
      car.turn('east')
      break
    case 'ArrowLeft':
      car.turn('west')
    }
})
