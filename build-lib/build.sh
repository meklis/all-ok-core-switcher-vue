#!/usr/bin/env bash

#Switcher
vue-cli-service build  --target lib  --production --name Switcher ./src/Switcher.vue

#Switcher pages
vue-cli-service build --no-clean --production --target lib --name SwitcherActions ./src/components/pages/actions.vue
vue-cli-service build --no-clean --production --target lib --name SwitcherHome ./src/components/pages/home.vue
vue-cli-service build --no-clean --production --target lib --name SwitcherPorts ./src/components/pages/ports.vue
vue-cli-service build --no-clean --production --target lib --name SwitcherSysInfo ./src/components/pages/sysinfo.vue

#Prepare dist directories
if [ -d ./dist-lib ]; then rm -Rf  ./dist-lib; fi
mkdir -p ./dist-lib/assets
mkdir -p ./dist-lib/js
mkdir -p ./dist-lib/css

#Copy compiled js files
cp ./dist/Switcher.umd.min.js ./dist-lib/js
cp ./dist/SwitcherActions.umd.min.js ./dist-lib/js
cp ./dist/SwitcherHome.umd.min.js ./dist-lib/js
cp ./dist/SwitcherPorts.umd.min.js ./dist-lib/js
cp ./dist/SwitcherSysInfo.umd.min.js ./dist-lib/js

#Copy compiled css files
cp ./dist/Switcher.css ./dist-lib/css
cp ./dist/SwitcherSysInfo.css ./dist-lib/css

#Copy statics
cp ./src/assets/* ./dist-lib/assets
cp ./build-lib/main.js ./dist-lib/js/main.js
cp ./build-lib/index.html ./dist-lib/index.html


#Load Vue.js
wget https://cdn.jsdelivr.net/npm/vue@2.6.11 -O ./dist-lib/js/vue.min.js
wget https://unpkg.com/vue-router/dist/vue-router.js -O ./dist-lib/js/vue-router.min.js

rm -R ./dist
