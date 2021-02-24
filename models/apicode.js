const cfg = require('./config');
const sqlite3 = require('sqlite3');
const fs = require('fs');

(function() {
  const runtime = './runtime';
  if (!fs.existsSync(runtime)) {
    fs.mkdirSync(runtime);
  }
  const db = new sqlite3.Database(cfg.db_path);
  const sql = `CREATE TABLE IF NOT EXISTS mock_apicode
    (api_code_id integer,
      api_code varchar(255),
      api_secret varchar(255),
      wallet_id integer UNIQUE,
    PRIMARY KEY (api_code_id))`;
  db.run(sql);
  db.close();
})();

module.exports.getAPICode = function (walletID) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(cfg.db_path);
    const sql = `SELECT api_code code, api_secret secret
      FROM mock_apicode
      WHERE wallet_id  = ?`;
    db.get(sql, [walletID], (err, row) => {
      if (!err && row) {
        resolve({ code: row.code, secret: row.secret });
      } else {
        // try read-only API code
        db.get(sql, [0], (err, row) => {
          if (!err && row) {
            resolve({ code: row.code, secret: row.secret });
          } else {
            reject(null);
          }
        });
      }
    });
    db.close();
  });
}

module.exports.setAPICode = function (walletID, code, secret) {
  const db = new sqlite3.Database(cfg.db_path);
  const sql = `REPLACE INTO mock_apicode (wallet_id, api_code, api_secret) VALUES(?, ?, ?)`;
  db.run(sql, [walletID, code, secret]);
  db.close();
}