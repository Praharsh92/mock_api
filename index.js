const Log = require('log');
const express = require('express');
const fs = require('fs');
var cors = require('cors');
// const multer = require('multer');
const dataBase = require('./database')

const app = express();
const port = 8000;
const RESPONSE_DELAY = 0;

var whitelist = ['http://localhost', 'http://172.16.91.190']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  }else{
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

//
// const storage = multer.diskStorage({
//   destination: './files',
//   filename(req, file, cb) {
//     cb(null, `${file.name}`);
//   },
// });
// const upload = multer({
//   storage
// });

const log = new Log('DEBUG', fs.createWriteStream('app.log', {
  flags: 'a'
}));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors({origin: 'http://localhost'}));
app.use(function(req, res, next) {
  console.log(req.body);
  log.info("On - " + req.url + " : With body", req.body);
  next();
});


app.get('/api/users', dataBase.getUsers);
app.post('/api/users', dataBase.createUser);
app.post('/api/users/update', dataBase.updateUser);
app.post('/api/users/delete', dataBase.deleteUser);


app.listen(port, '0.0.0.0');
