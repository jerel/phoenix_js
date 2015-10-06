
# Phoenix Framework JS [![Build Status](https://travis-ci.org/jerel/phoenix_js.svg?branch=master)](https://travis-ci.org/jerel/phoenix_js)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/aNTaTe.svg)](https://saucelabs.com/u/aNTaTe)

This is a work-in-progress that aims to enable better testing and distribution
of the client side portion of Phoenix channels.

`npm install --save https://github.com/jerel/phoenix_js.git` and then in your ES6 code you can use the
channel feature like this:

``` javascript
import Socket from "phoenix-js/src/socket";

let socket = new Socket("/socket", {params: {token: 'your-auth-token'}})
socket.connect()
```

### Running tests

``` bash
$ npm install
$ npm test
```

Additionally, to watch and transpile during development:

``` bash
$ npm install -g brunch
$ brunch watch
$ vim src/
```


### Hacking on this code inside a Phoenix installation:

Due to [a bug in Brunch](https://github.com/brunch/brunch/issues/1023)
that prevents it from accessing modules stored inside `node_modules` you must
copy the source out of the `node_modules` folder before running `brunch build`:

```
npm install --save https://github.com/jerel/phoenix_js.git
mkdir phoenix-js
cp -R node_modules/phoenix-js/src phoenix-js/src
```

Add `"phoenix-js/src",` to `paths.watch` in brunch-config.js so Phoenix's
Brunch instance knows about the files. Now you can `import Socket from 'phoenix/src/socket'`
in Phoenix's `socket.js` module. They will now be watched and transpiled.

