# UEC-CM Frontend

## Pre-requisites

- Install Node and NPM
- Install and setup Docker

## Running the project test

```bash
npm install
npm start
```

Runs the app and is viewable at `http://localhost:3000` in the browser.

## Running the Tests

### Locally

`npm test`

### In Pipeline

`npm test:ci`

### In Pipeline with Coverage

`npm test:coverage`

## Building the project

`npm run build`

Builds the app for production to the `build` folder and bundles React in production mode.
The build is minified and the filenames include the hashes and can be deployed.

### Incrementing the build number

`npm run prebuild`
Auto increment build number and sets build date to today
