<p style="text-align: center" >
  <img alt="Kabisa logo" src="https://fronteers.nl/_img/werkgevers/kabisa-2.png" height="160"/>
</p>

![Node.js CI](https://github.com/kabisa/kudos-frontend/workflows/Node.js%20CI/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/359d3d72f680d535ec5b/maintainability)](https://codeclimate.com/github/kabisa/kudos-frontend/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/359d3d72f680d535ec5b/test_coverage)](https://codeclimate.com/github/kabisa/kudos-frontend/test_coverage)
# Kudos-o-Matic Frontend

> React PWA app for the Kudo-o-matic platform!

Backend: https://github.com/kabisa/kudo-o-matic

## Quick start guide

### Prerequisites

- Node.js >=8 + NPM, for the build system
- Yarn >= 1, for package management
- Chrome v59.x or higher to run the tests headless
- Java 8 (or higher) to run the end-to-end tests (it powers the selenium server)

## Development workflow

- Running `yarn install` will hook you up with everything you'll need
- `yarn start` will start the development server on http://localhost:9090.
- To create a static HTML5 app build, run `yarn build`. The app will be built into the `dist/` directory.
- To run all tests, run `yarn test`.

## Environment variables

Create react app will automatically set NODE_ENV and load the correct configuration based on the way you started the application.
Running the app with `yarn start` will set the NODE_ENV to 'development' and running `yarn build` will use the production config.
All environment variables should be prefixed with `REACT_APP_`. Read more about it [here](https://create-react-app.dev/docs/adding-custom-environment-variables/).

### Required environment variables

`REACT_APP_API_BASE_URL`: The URL of the kudo-o-matic backend.    

## Code formatting

Code formatting and style are enforced using ESLint.
You can run the `yarn lint:check` command to run an analysis.
You can use the ESLint auto fix feature by running `yarn lint:run`

## Slack integration
The frontend application requires no special action to make the Slack integration work.
See the [back-end docs](https://github.com/kabisa/kudo-o-matic/blob/develop/docs/SLACK_INTEGRATION.md) for more information.  

## CI and deployment
The project is build using [GitHub actions](https://github.com/kabisa/kudos-frontend/actions) with every commit.
See the .github directory for the configuration file.

The project is hosted on [Netlify](https://app.netlify.com/teams/kabisa/sites) and deployed using commit hooks.
The following environments exist:
- [Staging](https://kudos.develop.kabisa.io/)
- [Production](https://kudos.kabisa.io/) 

## Contributing

### Step 1

- **Option 1**

  - Fork this repo

- **Option 2**
  - Clone this repo to your local machine using `https://github.com/kabisa/kudos-frontend.git`.

### Step 2

- **HACK AWAY!**

### Step 3

- Open a new pull request

## Team

|            <a href="https://www.linkedin.com/in/stefanpahlplatz/" target="_blank">**Stefan Pahlplatz**</a>             |
| :--------------------------------------------------------------------------------------------------------------------: |
| [![Stefan Pahlplatz](https://avatars1.githubusercontent.com/u/23485653?s=200&v=4)](https://github.com/StefanPahlplatz) |
|             <a href="https://github.com/StefanPahlplatz" target="_blank">`github.com/stefanpahlplatz`</a>              |

---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2018 © <a href="https://www.kabisa.nl/" target="_blank">Kabisa B.V.</a>.
