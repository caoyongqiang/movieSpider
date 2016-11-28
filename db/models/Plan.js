const db = require('../db');

module.exports = db.defineModel('plans', {
    plan_date: db.BIGINT,
    start_date: db.BIGINT,
    finish_date: db.BIGINT,
    type: db.STRING(100),
    title: db.STRING(100),
    content: db.TEXT
});
