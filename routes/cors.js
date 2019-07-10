const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = ['http://localhost:3000', 'https://localhost:3443', 'http://luribe-ltm:3001', 'https://konfusion-server.herokuapp.com/', 'https://konfusion-server.herokuapp.com:43058'];
const getCorsOptions = (req) => {
  if (whitelist.indexOf(req.header('Origin')) !== -1) return { origin: true };
  return { origin: false };
};

const corsOptionsDelegate = (req, callback) => {
  console.log(req.header('Origin'));
  const corsOptions = getCorsOptions(req);

  // var corsOptions;
  // console.log(req.header('Origin'));
  // if(whitelist.indexOf(req.header('Origin')) !== -1) {
  //   corsOptions = { origin: true };
  // }
  // else {
  //   corsOptions = { origin: false };
  // }

  callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
