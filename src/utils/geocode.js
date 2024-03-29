import fetch from "node-fetch";

function geoCode(location, callback) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${process.env.MB_API_KEY}`;
  // console.log('URL for mapbox: ',url);
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.features.length === 0) {
        callback("Unable to find location. Try another search", undefined);
        // throw new Error("Location not found. Try a different search");
      } else {
        const { features } = data;
        callback(undefined, {
          location: features[0].place_name,
          long: features[0].center[0],
          lat: features[0].center[1],
        });
      }
    })
    .catch((err) => {
      callback(err, undefined);
    });
}

export { geoCode };
