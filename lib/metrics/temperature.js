const { Gauge } = require('prom-client')
const { readDHT } = require('./read-dht')

module.exports = function temperatureGauge(sensorPin) {
  return new Gauge({
    name: 'terrarium_temperature',
    help: 'Terrarium temperature in Celsius',
    async collect() {
      const { temp } = await readDHT(sensorPin)
      this.set(temp)
    },
  })
}
