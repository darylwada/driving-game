class Car {
  constructor($carImage, speed, direction, location) {
    this.$carImage = $carImage
    this.speed = speed
    this.direction = direction
    this.location = location
    this.started = false
    this.interval = null
  }

  turn(direction) {
    this.direction = direction
    this.$carImage.className = direction
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
    this.$carImage.style.top = `${this.location[1]}px`
    this.$carImage.style.left = `${this.location[0]}px`
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
  constructor($carImage, speed, direction, location, nitros) {
    super($carImage, speed, direction, location)
    this.nitros = nitros
  }

  nitro() {
    if (this.nitros > 0) {
      this.speed *= 2
      this.nitros--
    }
  }
}

function createCar($carImage, carType) {
  return carType === 'streetcar'
    ? new Car($carImage, 5, 'east', [0, 0])
    : new RaceCar($carImage, 5, 'east', [0, 0], 3)
}

function createCarImage(carType) {
  var $carImage = document.createElement('img')

  $carImage.className = 'east'
  $carImage.style = "top: 0px; left: 0px;"
  $carImage.src = carType === 'streetcar'
    ? 'car-top-down.png'
    : 'racecar-top-down.png'

  return $carImage
}

var car = {}

document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', (event) => {
    var carType = event.target.value
    var $carImage = createCarImage(carType)

    car = createCar($carImage, carType)

    document.body.innerHTML = ''
    document.body.appendChild($carImage)
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
