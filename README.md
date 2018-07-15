# micro-svg-to

A micro-service for serving SVGs in a variety of file formats. Currently only supports `.svg` and `.png`

## Getting started

### Run locally

```bash
docker build -t assets .
docker run -p 3000:3000 assets
```

### Deploy

```bash
now
```

## Usage

Once the micro-service is running, you can request svgs using the following URL format:

```
https://localhost:3000/${svgFileName}.${outputFileType}?width=${width}&height=${height}
// e.g.
https://localhost:3000/arrow-left.png?width=20&height=20
```

Note that `width` and `height` parameters only work for raster based images.