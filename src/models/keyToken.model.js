'use strict';

const { Schema, model, default: mongoose } = require('mongoose');

const DOCUMENT_NAME = 'key';
const COLLECTION_NAME = 'keys';

const keyTokenSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Shop',
        },
        publicKey: {
            type: String,
            required: true,
        },
        privateKey: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: Array,
            default: [],
        },
    },
    {
        collection: COLLECTION_NAME,
        timestamps: true,
    },
);

module.exports = mongoose.model(DOCUMENT_NAME, keyTokenSchema);
