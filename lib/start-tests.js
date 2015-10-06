
var modules = require.list();

for (var i=0; i<modules.length; i++) {
  if (modules[i].match(/^tests/)) {
    require(modules[i])
  }
}

