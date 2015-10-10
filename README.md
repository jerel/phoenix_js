
## Phoenix Framework JS [![Build Status](https://travis-ci.org/jerel/phoenix_js.svg?branch=master)](https://travis-ci.org/jerel/phoenix_js)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/aNTaTe.svg)](https://saucelabs.com/u/aNTaTe)

The client component of [Phoenix Framework channels](http://www.phoenixframework.org/docs/channels).

### Install

``` bash
npm install --save phoenix_js
```

And then in your ES6 code you can import the channel feature like this:

``` javascript
import Socket from "phoenix_js/src/socket"

let socket = new Socket("/socket", {params: {token: 'your-auth-token'}})
socket.connect()
```

Or to force a specific transport:

``` javascript
import { LongPoll } from "phoenix_js/src/transports"
let socket = new Socket("/socket", { transport: LongPoll })
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


### Usage inside a Phoenix HTML installation:

Due to [a bug in Brunch](https://github.com/brunch/brunch/issues/1023)
that prevents it from accessing modules stored inside `node_modules` you must
copy the source out of the `node_modules` folder before running `brunch build`:

```
npm install --save phoenix_js
mkdir phoenix_js
cp -R node_modules/phoenix_js/src phoenix_js/src
```

Add `"phoenix_js/src",` to `paths.watch` in brunch-config.js so Phoenix's
Brunch instance knows about the files. Now you can `import Socket from 'phoenix/src/socket'`
in Phoenix's `socket.js` module. They will now be watched and transpiled.

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

