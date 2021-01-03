const http = require("http");

const geoPlugin = async (request, response, next) => {
  http
    .get("http://www.geoplugin.net/json.gp", (res) => {
      res.setEncoding("utf8");
      let rawData = "";
      res.on("data", (chunk) => {
        rawData += chunk;
      });
      res.on("end", () => {
        try {
          const parsedData = JSON.parse(rawData);
          console.log(parsedData);
          response.status(200).json(parsedData)
        } catch (e) {
          console.error(e.message);
          response.status(500).json({})
        }
      });
    })
    .on("error", (e) => {
      console.error(`Got error: ${e.message}`);
      response.status(500).json({})
    });
};

module.exports = geoPlugin;
