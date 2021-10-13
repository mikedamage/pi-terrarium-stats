const { readDHT } = require('../lib/read-dht')
const { Registry, Gauge } = require('prom-client')
const { readFile } = require('fs/promises')
const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const sensorPin = process.env.SENSOR_GPIO || 4

const registry = new Registry()

const temperature = new Gauge({
  name: 'terrarium_temperature',
  help: 'Terrarium temperature in Celsius',
  async collect() {
    const { temp } = await readDHT(sensorPin)
    this.set(temp)
  },
  registers: [registry],
})

const humidity = new Gauge({
  name: 'terrarium_humidity',
  help: 'Terrarium humidity in percent',
  async collect() {
    const { humidity } = await readDHT(sensorPin)
    this.set(humidity)
  },
  registers: [registry],
})

const piCpuTemp = new Gauge({
  name: 'pi_cpu_temp',
  help: 'Terrarium Pi CPU temperature in Celsius',
  async collect() {
    const rawTemp = await readFile('/sys/class/thermal/thermal_zone0/temp')
    this.set(parseInt(rawTemp, 10) / 1000)
  },
  registers: [registry],
})

app.get('/', async (req, res) => {
  const metrics = await registry.metrics()
  res.send(metrics)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

