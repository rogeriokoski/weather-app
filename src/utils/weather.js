import fetch from "node-fetch";

function forecast(lat, long, callback) {
  const url = `http://api.weatherstack.com/current?access_key=c279f533edd6461e678fe1894611f921&query=${lat},${long}`;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        callback("Location not found. Try a different search", undefined);
        // throw new Error("Location not found. Try a different search");
      } else {
        const { name, country } = data.location;
        const { weather_descriptions, temperature, precip } = data.current;
        callback(
          undefined,
          {
            name: name,
            country: country,
            description: weather_descriptions[0],
            temperature: temperature,
            precipChance: precip,
          }
          // `In ${name} the weather is ${weather_descriptions[0]}, with ${temperature} Celsius and a ${precip}% chance of rain`
        );
      }
    })
    .catch((err) => {
      callback(err, undefined);
    });
}

export { forecast };
