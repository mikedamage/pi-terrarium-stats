const execa = require('execa')
const { Gauge } = require('prom-client')

module.exports = function gpuTemp() {
  return new Gauge({
    name: 'pi_gpu_temp',
    help: 'Terrarium Pi GPU temperature in Celsius',
    async collect() {
      const { stdout } = await execa('/usr/bin/vcgencmd', ['measure_temp'])
      const tempStr = stdout.match(/=([\d\.]+)\'/)[1]
      this.set(parseFloat(tempStr))
    },
  })
}
