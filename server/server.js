const https = require('https');
const fs = require('fs');
const path = require('path');
const port = process.env.OPENSHIFT_NODEJS_PORT || process.env.VCAP_APP_PORT || process.env.PORT || process.argv[2] || 8765;
const frontPort = 3000;
const express = require('express');
const Gun = require('gun');
require('gun/axe');

const app = express();
app.use(express.static(path.join(__dirname, "public")));

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/", (req, res) => {
 res.sendFile(path.join(__dirname, "public", "index.html"));
});

/*
app.get("/stats", (req, res) => {
 res.sendFile(path.join(__dirname, "public", "stats.html"));
});
*/
//app.use(Gun.serve);

const httpsServer = https.createServer({
   key: fs.readFileSync(__dirname + '/ssl/gun-server.key'),
   cert: fs.readFileSync(__dirname + '/ssl/gun-server.crt')
}, app);

httpsServer.listen(frontPort);
const server = require('http').createServer(Gun.serve);
var gun = Gun({	file: 'data', web: server.listen(port) });
console.log("\u2705 \n⚛️  React-frontend on port ::" +frontPort+ "\n📟 Gun-server on port ::" + port);

global.Gun = Gun; /// make global to `node --inspect` - debug only
global.gun = gun; /// make global to `node --inspect` - debug only
