class Car {
  constructor($img, speed, direction, location) {
    this.$img = $img
    this.speed = speed
    this.direction = direction
    this.location = location
    this.started = false
    this.interval = null
  }
  turn(direction) {
    this.direction = direction
    this.$img.className = direction
  }
  move() {
    switch (this.direction) {
      case 'north':
        this.location[1] -= this.speed
        break
      case 'south':
        this.location[1] += this.speed
        break
      case 'east':
        this.location[0] += this.speed
        break
      case 'west':
        this.location[0] -= this.speed
    }
    this.$img.style = "top: " + this.location[1] + "px; " + "left: " + this.location[0] + "px;"
  }
  start() {
    this.interval = setInterval(() => this.move(), 16)
    this.started = true
  }
  stop() {
    clearInterval(this.interval)
    this.started = false
  }
}

class RaceCar extends Car {
  constructor($img, speed, direction, location, nitros) {
    super($img, speed, direction, location)
    this.nitros = nitros
    this.started = false
    this.interval = null
  }
  nitro() {
    this.speed *= 2
    this.nitros--
  }
}

function renderCar(type) {
  document.body.innerHTML = ''
  var $img = document.createElement('img')
  $img.className = 'east'
  $img.style = "top: 0px; left: 0px;"
  if (type === 'car') {
    $img.src = 'car-top-down.png'
    car = new Car($img, 10, 'east', [0, 0])
  }
  else if (type === 'racecar') {
    $img.src = 'racecar-top-down.png'
    car = new RaceCar($img, 10, 'east', [0, 0], 3)
  }
  document.body.appendChild($img)
}

var car

var $btns = document.querySelectorAll('button')
  $btns.forEach(btn => {
  btn.addEventListener('click', (event) => {
    renderCar(event.target.value)
  })
})

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
      break
    case 'Enter':
      car.nitro()
      break
    case ' ':
      car.started ? car.stop() : car.start()
    }
})
