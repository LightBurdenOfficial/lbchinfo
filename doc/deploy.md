# How to Deploy lbchinfo

lbchinfo is splitted into 3 repos:
* [https://github.com/LightBurdenOfficial/lbchinfo](https://github.com/LightBurdenOfficial/lbchinfo)
* [https://github.com/LightBurdenOfficial/lbchinfo-api](https://github.com/LightBurdenOfficial/lbchinfo-api)
* [https://github.com/LightBurdenOfficial/lbchinfo-ui](https://github.com/LightBurdenOfficial/lbchinfo-ui)

## Prerequisites

* node.js v12.0+
* mysql v8.0+
* redis v5.0+

## Deploy lbch core
1. `git clone --recursive https://github.com/LightBurdenOfficial/lbch.git --branch=lbchinfo`
2. Follow the instructions of [https://github.com/LightBurdenOfficial/lbch/blob/master/README.md#building-lbch-core](https://github.com/LightBurdenOfficial/lbch/blob/master/README.md#building-lbch-core) to build lbch
3. Run `lbchd` with `-logevents=1` enabled

## Deploy lbchinfo
1. `git clone https://github.com/LightBurdenOfficial/lbchinfo.git`
2. `cd lbchinfo && npm install`
3. Create a mysql database and import [docs/structure.sql](structure.sql)
4. Edit file `lbchinfo-node.json` and change the configurations if needed.
5. `npm run dev`

It is strongly recommended to run `lbchinfo` under a process manager (like `pm2`), to restart the process when `lbchinfo` crashes.

## Deploy lbchinfo-api
1. `git clone https://github.com/LightBurdenOfficial/lbchinfo-api.git`
2. `cd lbchinfo-api && npm install`
3. Create file `config/config.prod.js`, write your configurations into `config/config.prod.js` such as:
    ```javascript
    exports.security = {
        domainWhiteList: ['http://example.com']  // CORS whitelist sites
    }
    // or
    exports.cors = {
        origin: '*'  // Access-Control-Allow-Origin: *
    }

    exports.sequelize = {
        logging: false  // disable sql logging
    }
    ```
    This will override corresponding field in `config/config.default.js` while running.
4. `npm start`

## Deploy lbchinfo-ui
This repo is optional, you may not deploy it if you don't need UI.
1. `git clone https://github.com/LightBurdenOfficial/lbchinfo-ui.git`
2. `cd lbchinfo-ui && npm install`
3. Edit `package.json` for example:
   * Edit `script.build` to `"build": "LBCHINFO_API_BASE_CLIENT=/api/ LBCHINFO_API_BASE_SERVER=http://localhost:3001/ LBCHINFO_API_BASE_WS=//example.com/ nuxt build"` in `package.json` to set the api URL base
   * Edit `script.start` to `"start": "PORT=3000 nuxt start"` to run `lbchinfo-ui` on port 3000
4. `npm run build`
5. `npm start`
