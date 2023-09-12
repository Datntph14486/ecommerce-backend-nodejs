'use strict';

const keyTokenModel = require('../models/keyToken.model');

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey }) => {
        try {
            // level 0
            // const tokens = await keyTokenModel.create({
            //     user: userId,
            //     publicKey,
            //     privateKey,
            // });

            // return tokens ? tokens.publicKey : null;

            //level xxx
            const filter = { user: userId },
                update = {
                    publicKey,
                    privateKey,
                    refreshTokenUsed: [],
                    refreshToken,
                },
                options = { upsert: true, new: true };

            const tokens = await keyTokenModel.findOneAndUpdate(
                filter,
                update,
                options,
            );
        } catch (error) {}
    };
}

module.exports = KeyTokenService;
