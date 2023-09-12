'use strict';

const apiKeyModel = require('../models/apiKey.model');
const crypto = require('crypto');

const findById = async (key) => {
    const objectKey = await apiKeyModel.findOne({ key, status: true }).lean();

    return objectKey;
};

module.exports = {
    findById,
};
