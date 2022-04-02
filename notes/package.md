### Backup 1

> On time: 2022-04-03 12:13 AM

```json
{
  "name": "oses-blibs",
  "version": "1.0.0",
  "description": "Oses Blibs support api include typescript",
  "main": "app.js",
  "scripts": {
    "build": "rimraf ./target && tsc",
    "start:dev": "nodemon",
    "start": "npm run build && node target/server.js",
    "lint": "eslint . --ext .js",
    "prettier-format": "run-script-os",
    "prettier-format:win32": "prettier --config .prettierrc \"./src/**/*.js\" --write",
    "prettier-format:darwin:linux": "prettier --config .prettierrc 'src/**/*.js' --write",
    "prettier-format:default": "prettier --config .prettierrc 'src/**/*.js' --write",
    "prettier-watch": "run-script-os",
    "prettier-watch:win32": "onchange \"src/**/*.ts\" -- prettier --write {{changed}}",
    "prettier-watch:darwin:linux": "onchange 'src/**/*.ts' -- prettier --write {{changed}}",
    "prettier-watch:default": "onchange 'src/**/*.ts' -- prettier --write {{changed}}",
    "test": "jest",
    "test:dev": "jest --watchAll"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/body-parser": "^1.19.0",
    "@types/cors": "^2.8.10",
    "@types/express": "^4.17.11",
    "@types/http-status": "^0.2.30",
    "@types/jest": "^26.0.14",
    "@types/morgan": "^1.7.35",
    "@types/node": "^12.7.2",
    "@typescript-eslint/eslint-plugin": "^2.21.0",
    "@typescript-eslint/parser": "^2.21.0",
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "eslint": "^6.8.0",
    "eslint-config-prettier": "^6.10.0",
    "eslint-plugin-prettier": "^3.1.2",
    "express": "^4.17.3",
    "nodemon": "^1.19.4",
    "onchange": "^6.1.0",
    "prettier": "^1.19.1",
    "rimraf": "^3.0.0",
    "run-script-os": "^1.1.1",
    "ts-node": "^8.10.2",
    "tslint": "^6.1.3",
    "typescript": "^4.2.4"
  },
  "dependencies": {
    "eslint-plugin-jest": "^24.1.0",
    "http-status": "^1.2.0",
    "jest": "^26.5.3",
    "morgan": "^1.9.0",
    "morgan-json": "^1.1.0",
    "ts-jest": "^26.4.1",
    "winston": "^3.6.0",
    "winston-daily-rotate-file": "^4.6.1"
  }
}

```