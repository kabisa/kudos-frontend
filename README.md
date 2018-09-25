<p align="center">
  <img src="https://dovetail.world/wp-content/uploads/2016/09/Logo-Kabisa-e1496142251302.png" height="160"/>
</p>
  
[![Build Status](https://travis-ci.org/kabisa/kudos-frontend.svg?branch=master)](https://travis-ci.org/kabisa/kudos-frontend)  

# Kudos-o-Matic Frontend

> The Kudos-o-Matic front end project. This is a cordova/react based application that supports Android, IOS and Web. For the quickest way to get the application running check [DockerHub](https://hub.docker.com/r/stefan314/kudos-frontend/) :whale:!

## :bulb: Installation

Running the project on android or IOS requires their respective emulators.:fire:

### :zap: Setup

```shell
$ git clone https://github.com/kabisa/kudos-frontend.git
$ cd kudos-frontend/kudos-o-matic
$ ./bin/setup.sh
$ yarn start
```

### :whale: Or run it with docker

```shell
$ git clone https://github.com/kabisa/kudos-frontend.git
$ cd kudos-frontend
$ docker build -f docker/dev/web/Dockerfile -t kudos-frontend .
$ docker run -it \
    -v /code/node_modules \
    -v ${PWD}/kudos-o-matic:/code \
    -p 3000:3000 \
    -p 3001:3001 \
    --rm \
    kudos-frontend
```

## :computer: Run on emulators

Requires the android emulator up and running (or a connected mobile device). Assumes that you ran `npm install` in the root directory and are currently in the root directory of the project. :calling:

### :phone: Run on Android

```shell
$ cordova run android
```

### :iphone: Run on iOS

Requires that you're on a mac.

```shell
$ open -a Simulator
$ cordova run ios
```

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

---

## :hearts: Team

|                 <a href="https://www.linkedin.com/in/stefanpahlplatz/" target="_blank">**Stefan Pahlplatz**</a>                 |
|:----------------------------------------------------------------------------------------------------------:|
| [![Stefan Pahlplatz](https://avatars1.githubusercontent.com/u/23485653?s=200&v=4)](https://github.com/StefanPahlplatz) |
|         <a href="https://github.com/StefanPahlplatz" target="_blank">`github.com/stefanpahlplatz`</a>         |

---

## :anchor: License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2018 © <a href="https://www.kabisa.nl/" target="_blank">Kabisa B.V.</a>.
