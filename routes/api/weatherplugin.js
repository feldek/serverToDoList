const http = require("http");
const axios = require("axios");
const weatherKey = process.env.OPEN_WEATHER_MAP_KEY;

const geoPlugin = async (request, response, next) => {
  try {
    let result = await axios.get("http://www.geoplugin.net/json.gp");
    console.log(result.data);
    response.status(200).json(result.data);
  } catch (e) {
    console.log("err");
    response.status(500).json({});
  }
};

const weatherPlugin = async (request, response, next) => {
  try {
    let result = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: request.query.lat,
        lon: request.query.lon,
        appid: weatherKey,
        units: "metric",
      },
    });
    console.log(result.data);
    response.status(200).json(result.data);
  } catch (e) {
    console.log("err", e);
    response.status(500).json({});
  }
};

module.exports = { geoPlugin, weatherPlugin };
