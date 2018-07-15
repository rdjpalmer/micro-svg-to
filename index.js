const fs = require("fs");
const { promisify } = require("util");
const { send } = require("micro");
const { convert } = require("convert-svg-to-png");
const query = require("micro-query");

const readFileAsync = promisify(fs.readFile);

const icons = {
  app: "./assets/icons/app.svg",
  "arrow-left": "./assets/icons/arrow-left.svg",
  "arrow-right": "./assets/icons/arrow-right.svg",
  check: "./assets/icons/check.svg",
  delete: "./assets/icons/delete.svg",
  info: "./assets/icons/info.svg",
  pause: "./assets/icons/pause.svg",
  play: "./assets/icons/play.svg",
  plus: "./assets/icons/plus.svg"
};

module.exports = async (req, res) => {
  const urlParameters = req.url.split("/")[1];
  const queryParameters = query(req);
  const [name, format] = urlParameters.replace(/\?(.*)/, "").split(".");
  const width = queryParameters.width || 16;
  const height = queryParameters.height || 16;

  try {
    if (name === "favicon") return "";
    const svg = await readFileAsync(icons[name]);

    if (format === "png") {
      const png = await convert(svg, {
        width,
        height,
        puppeteer: {
          args: ["--no-sandbox"]
        }
      });

      res.setHeader("Content-Type", "image/png");
      res.setHeader("Content-Length", png.length);

      return png;
    }

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Content-Length", svg.length);

    return svg;
  } catch (e) {
    console.error(e);
    send(res, 404, { error: `${urlParameters} could not be found` });
  }
};
