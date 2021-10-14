const { Gauge } = require('prom-client')
const { readDHT } = require('../read-dht')

module.exports = function humidityGauge(sensorPin) {
  return new Gauge({
    name: 'terrarium_humidity',
    help: 'Terrarium humidity in percent',
    async collect() {
      const { humidity } = await readDHT(sensorPin)
      this.set(humidity)
    },
  })
}
