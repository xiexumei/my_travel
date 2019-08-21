let mongoose = require('mongoose');
let collectSchema = require('../schemas/comments');

module.exports = mongoose.model('Collect',collectSchema);