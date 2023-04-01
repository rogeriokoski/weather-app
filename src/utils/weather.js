import fetch from "node-fetch";

function forecast(lat, long, callback) {
  // const url = `http://api.weatherstack.com/current?access_key=c279f533edd6461e678fe1894611f921&query=${lat},${long}`;
  const url = `http://api.weatherstack.com/current?access_key=${process.env.WS_API_KEY}&query=${lat},${long}`;
  console.log("URL for weatherstack: ", url);
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
        const { weather_descriptions, temperature, precip, humidity } =
          data.current;
        console.log(data);
        callback(
          undefined,
          {
            name: name,
            country: country,
            description: weather_descriptions[0],
            temperature: temperature,
            precipChance: precip,
            humidity: humidity,
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
