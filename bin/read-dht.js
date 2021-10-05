const sensor = require("node-dht-sensor");
const argv = require("yargs").argv;
const { readDHT } = require("../lib/read-dht");

const [pin] = argv._;

readDHT(pin).then(({ temp, humidity }) => {
  console.log(`Temp: ${temp}F, Humidity: ${humidity}%`);
});
