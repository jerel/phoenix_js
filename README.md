
## Phoenix Framework JS [![Build Status](https://travis-ci.org/jerel/phoenix_js.svg?branch=master)](https://travis-ci.org/jerel/phoenix_js)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/aNTaTe.svg)](https://saucelabs.com/u/aNTaTe)

The client component of [Phoenix Framework channels](http://www.phoenixframework.org/docs/channels).


### Install

``` bash
npm install --save phoenix_js
```

`phoenix_js` is also available on Bower:

``` bash
bower install --save phoenix_js
```

And then, you can import the channel feature like this:

``` javascript
import { Socket } from "phoenix_js"

let socket = new Socket("/socket", {params: {token: 'your-auth-token'}})
socket.connect()
```

Or to force a specific transport:

``` javascript
import { LongPoll, WebSocket } from "phoenix_js"
let socket = new Socket("/socket", { transport: LongPoll })
socket.connect()
```


### Usage inside a Phoenix HTML installation:

```
npm install --save phoenix_js
```

Add `"node_modules/phoenix_js/dist/phoenix.umd.js",` to `paths.watched` in brunch-config.js so Phoenix's
Brunch instance knows about the files. Now you can `import { Socket } from 'phoenix_js'`
in Phoenix's `socket.js` module..


### Usage with other build systems

This package provides distribution files for CommonJS, AMD, and Globals. All are
found in the `dist` folder.

CommonJS, used in Node or via require.js is named `phoenix.umd.js` as it is shipped
as a universal module that should also support AMD.

AMD, is named `phoenix.amd.js` and is provided for strict AMD systems such as Ember CLI
that can't consume a universal module.

Globals, named `phoenix.js` is really a UMD module but exports the `window.Phoenix` object.
Use this format if you just want to add a script tag to your page.

ES6 is available in the `src` directory and the `jsnext:main` points to `src/phoenix.js`.


### Running tests

``` bash
$ npm install
$ npm test
```


## License

Copyright (c) 2015 Chris McCord

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

