const devcert = require('devcert');
const fs = require('fs');
const { API_BASE_URL, CLIENT_URL } = require('../config/apiConfig');

if (!fs.existsSync('./certs')) {
  fs.mkdirSync('./certs');
}

const domains = [`${API_BASE_URL}`, `${CLIENT_URL}`];

devcert
  .certificateFor(domains, { getCaPath: true })
  .then(({ key, cert, caPath }) => {
    fs.writeFileSync('./certs/devcert.key', key);
    fs.writeFileSync('./certs/devcert.cert', cert);
    fs.writeFileSync('./certs/.capath', caPath);
  })
  .catch(console.error);
