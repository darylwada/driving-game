class Car {
  constructor($img, speed, direction, location) {
    this.$img = $img
    this.speed = speed
    this.direction = direction
    this.location = location
  }
  turn(direction) {
    this.direction = direction
    switch (this.direction) {
      case 'north':
        this.$img.className = 'north'
        break
      case 'south':
        this.$img.className = 'south'
        break
      case 'east':
        this.$img.classList.add('east')
        break
      case 'west':
        this.$img.classList.add('west')
      }
  }
}

var $img = document.createElement('img')
$img.src = 'car-top-down.png'
document.body.appendChild($img)

var car = new Car($img)

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
