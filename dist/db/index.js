'use strict';

var _pg = require('pg');

var pool = new _pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

module.exports = pool;
//# sourceMappingURL=index.js.map