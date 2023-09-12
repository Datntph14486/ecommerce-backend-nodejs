'use strict';

'use strict';

const { Schema, model, default: mongoose } = require('mongoose');

const DOCUMENT_NAME = 'Apikey';
const COLLECTION_NAME = 'Apikeys';

const keyTokenSchema = new Schema(
    {
        key: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            default: true,
        },
        permissions: {
            type: [String],
            required: true,
            enum: ['0000', '1111', '2222'],
        },
    },
    {
        collection: COLLECTION_NAME,
        timestamps: true,
    },
);

module.exports = mongoose.model(DOCUMENT_NAME, keyTokenSchema);
