const db = require('../db');

module.exports = db.defineModel('movies', {
    title: db.STRING(100),
    rate: db.STRING(10),
    url: db.STRING(100),
});
