const sensor = require('node-dht-sensor')
const argv = require('yargs').argv

const gpioPin = 4

function toFahrenheit(temp) {
  return (temp * (9 / 5)) + 32
}

function readSensor() {
  return new Promise((resolve, reject) => {
    sensor.read(11, gpioPin, (err, temp, humidity) => {
      if (err) return reject(err)
      resolve({ temp, humidity })
    })
  })
}

readSensor().then(({ temp, humidity }) => {
  console.log(`Temp: ${toFahrenheit(temp)}F, Humidity: ${humidity}%`)
})