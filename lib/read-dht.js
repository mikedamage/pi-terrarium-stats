const sensor = require("node-dht-sensor");

const toFahrenheit = (temp) => temp * (9 / 5) + 32;

exports.toFahrenheit = toFahrenheit;

exports.readDHT = function (pin) {
  return new Promise((resolve, reject) => {
    sensor.read(11, pin, (err, temp, humidity) => {
      if (err) return resolve(err);
      resolve({ temp, humidity });
    });
  });
};
