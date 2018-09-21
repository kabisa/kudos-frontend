#!/bin/bash

# Install cordova dependencies
npm install

npm install -g gitmoji-commit-hook
gitmoji-commit-hook --init

# Install react dependencies
cd kudos-o-matic || exit 1
yarn

# Done
echo "Setup succesful!"
