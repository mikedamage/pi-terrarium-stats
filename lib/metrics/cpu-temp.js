const { readFile } = require('fs/promises')
const { Gauge } = require('prom-client')

module.exports = function cpuTemp() {
  return new Gauge({
    name: 'pi_cpu_temp',
    help: 'Terrarium Pi CPU temperature in Celsius',
    async collect() {
      const rawTemp = await readFile('/sys/class/thermal/thermal_zone0/temp')
      this.set(parseInt(rawTemp, 10) / 1000)
    },
  })
}
