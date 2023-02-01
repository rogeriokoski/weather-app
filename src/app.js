import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import hbs from "hbs";
import * as geo from "./utils/geocode.js";
import * as weather from "./utils/weather.js";

const app = express();
const port = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localPublic = path.join(__dirname, "../public");
const localViews = path.join(__dirname, "../templates/views");
const localPartials = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", localViews);
hbs.registerPartials(localPartials);
app.use(express.static(localPublic));

app.get("", (req, res) => {
  res.render("index", { title: "Weather", name: "Carlos RK" });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "Weather Neo App", name: "Carlos RK" });
});
app.get("/help", (req, res) => {
  res.render("help", {
    msg: "This is the help for the application",
    title: "Help Info",
    name: "Carlos RK",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "No address provided" });
  }
  geo.geoCode(req.query.address, (error, { location, lat, long } = {}) => {
    if (error) {
      res.send({ error });
      // return error?.message;
      // error?.cause?.errno,
      // error?.cause?.code,
      // error?.cause?.hostname
    } else {
      weather.forecast(lat, long, (error, weatherData) => {
        if (error) {
          res.send({ error });
        } else {
          res.send({
            forecast: `The weather is ${weatherData.description}. The temperature is ${weatherData.temperature}. Current volume of rain is ${weatherData.precipChance} cm. The humidity is ${weatherData.humidity}%`,
            location: location,
            address: req.query.address,
            name: "Carlos RK ",
          });
        }
      });
    }
  });
});

//Error handler. No route found in get methods above
app.get("/help/*", (req, res) => {
  res.render("error", { title: "Error", msg: "No Help Article Found" });
});

app.get("*", (req, res) => {
  res.render("error", { title: "Error", msg: "404 error. Page not found" });
});

app.listen(port, () => {
  console.log(`Server is up in port ${port}`);
});
