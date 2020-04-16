const fs = require('fs');

const cfg = JSON.parse(fs.readFileSync('conf/mockserver.conf.json'));

module.exports = cfg;