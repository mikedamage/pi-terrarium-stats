#!/usr/bin/env node

const { Registry } = require('prom-client')
const express = require('express')
const app = express()

// Metrics
const temperatureGauge = require('../lib/metrics/temperature')
const humidityGauge = require('../lib/metrics/humidity')
const cpuTemp = require('../lib/metrics/cpu-temp')
const gpuTemp = require('../lib/metrics/gpu-temp')

const port = process.env.PORT || 8000
const sensorPin = process.env.SENSOR_GPIO || 4
const registry = new Registry()

registry.registerMetric(temperatureGauge(sensorPin))
registry.registerMetric(humidityGauge(sensorPin))
registry.registerMetric(cpuTemp())
registry.registerMetric(gpuTemp())

app.get('/', async (_req, res) => {
  const metrics = await registry.metrics()
  res.send(metrics)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
