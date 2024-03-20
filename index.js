const https = require('https');
const fs = require('fs');
const path = require("path")
const options = {
  key: fs.readFileSync('/etc/letsencrypt/archive/nata.capawards.com/privkey2.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/archive/nata.capawards.com/fullchain2.pem')
};

const express = require("express");
const cors = require('cors')
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

const api = 'http://65.109.83.26:5555'

app.use(cors())
app.use(morgan('dev'));

app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to Billing and Account APIs.');
 });


 app.use('*', createProxyMiddleware({
    target: api,
    changeOrigin: true,
 }));

const server = https.createServer(options,app)
server.listen(443, () => console.log("Server ready on port 3000."));

