
var port    = process.env.OPENSHIFT_NODEJS_PORT || process.env.VCAP_APP_PORT || process.env.PORT || process.argv[2] || 8765;
var express = require('express');
var Gun     = require('gun');
require('gun/axe');

var app    = express();
app.use(Gun.serve);
app.use(express.static(__dirname + "/public"));

var server = app.listen(port);
var gun = Gun({	file: 'data', web: server });

global.Gun = Gun; /// make global to `node --inspect` - debug only
global.gun = gun; /// make global to `node --inspect` - debug only

