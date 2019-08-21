
let mongoose = require('mongoose');
let pdMoodSchema = require('../Schemas/pdMood');

module.exports = mongoose.model('PdMood',pdMoodSchema);