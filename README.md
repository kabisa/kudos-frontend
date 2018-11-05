<p align="center">
  <img src="https://dovetail.world/wp-content/uploads/2016/09/Logo-Kabisa-e1496142251302.png" height="160"/>
</p>
  
[![Build Status](https://travis-ci.org/kabisa/kudos-frontend.svg?branch=master)](https://travis-ci.org/kabisa/kudos-frontend)

# Kudos-o-Matic Frontend

> The Kudos-o-Matic front end project. This is a cordova/react based application that supports Android, IOS and Web. For the quickest way to get the application running check [DockerHub](https://hub.docker.com/r/stefan314/kudos-frontend/) :whale:!

## :bulb: Getting started

- Make sure you have fulfilled the [prerequisites](#prerequisites)
- Running `yarn install` will hook you up with everything you need

## :zap: Development workflow

- While developing you can run a local server using `bin/maji start`. This will start a server on http://localhost:9090.
- To create a static HTML5 app build, run `bin/maji build`. The app will be built into the `dist/` directory.
- To run the app on a connected mobile device, run `bin/maji run <platform>`.
- To build a Cordova app, run `bin/maji build <platform>`.
- To run Javascript tests, run `bin/maji test --watch`. This will start a Karma server with Phantomjs and will continuously watch your Javascript files and run tests on changes.
- To run integration specs, run `bin/maji test --integration`.
- To run all tests, run `bin/maji test`.

## :wrench: Code formatting

Code is formatted by [Prettier](https://github.com/prettier/prettier).
A git commit hook is automatically installed that will format your code when you commit.
Prettier can also be run manually using `yarn run prettier` or `yarn run prettier -- --write`.

## :computer: Packaging native apps / running on your device

- Make sure you have fulfilled the platform specific [prerequisites](#prerequisites) for the platform you're targeting.
- Running `bin/maji run` with the target platform as parameter, e.g. `bin/maji run ios` will launch the app on your connected iPhone, while `bin/maji run android` will launch the app on your connected Android device. Specifying `-e` on the `maji run` command will launch the app on the iOS Simulator or Android Emulator.

---

## Prerequisites

### General

- Node.js >=8 + NPM, for the build system
- Yarn >= 1, for package management
- Chrome v59.x or higher to run the tests headless
- Java 8 (or higher) to run the end-to-end tests (it powers the selenium server)

### :iphone: iOS

- XCode
- iOS SDK

### :phone: Android

- Android SDK
- Android platform tools installed
- Android platform 10+.
- `android` and `adb` in your $PATH (add `path/to/android-sdk-macosx/tools` and `path/to/android-sdk-macosx/platform-tools` to your $PATH).

---

## :wrench: Contributing

> To get started...

### Step 1

- **Option 1**

  - 🍴 Fork this repo!

- **Option 2**
  - 👯 Clone this repo to your local machine using `https://github.com/kabisa/kudos-frontend.git`

### Step 2

- **HACK AWAY!** 🔨🔨🔨

### Step 3

- 🔃 Create a new pull request using <a href="https://github.com/kabisa/kudos-frontend/pulls" target="_blank">`https://github.com/kabisa/kudos-frontend/pulls`</a>.

## :hearts: Team

|            <a href="https://www.linkedin.com/in/stefanpahlplatz/" target="_blank">**Stefan Pahlplatz**</a>             |
| :--------------------------------------------------------------------------------------------------------------------: |
| [![Stefan Pahlplatz](https://avatars1.githubusercontent.com/u/23485653?s=200&v=4)](https://github.com/StefanPahlplatz) |
|             <a href="https://github.com/StefanPahlplatz" target="_blank">`github.com/stefanpahlplatz`</a>              |

---

## :anchor: License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2018 © <a href="https://www.kabisa.nl/" target="_blank">Kabisa B.V.</a>.
