
# JavaScript for the Phoenix Framework

This is a work-in-progress that aims to enable better testing and distribution
of the client side portion of Phoenix channels.

`npm install --save https://github.com/jerel/phoenix_js.git` and then in your ES6 code you can use the
channel feature like this:

``` javascript
import {Socket} from "phoenix-js";

let socket = new Socket("/socket", {params: {token: 'your-auth-token'}})
socket.connect()
```

#### Hacking on this code inside a Phoenix installation:

```
npm install --save https://github.com/jerel/phoenix_js.git
cd node_modules/phoenix-js
babel -w -d lib src/
```
* assumes you have babel installed globally with `npm install -g babel`

Add `"node_modules/phoenix-js/lib",` to `paths.watch` in brunch-config.js
so Phoenix will watch and reload the browser each time babel transpiles to
the lib directory. Now hack on files in `src`.

