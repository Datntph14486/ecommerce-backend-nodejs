'use strict';

const JWT = require('jsonwebtoken');

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        // access token
        const accessToken = await JWT.sign(payload, publicKey, {
            expiresIn: '2 days',
        });

        // refreshToken
        const refreshToken = await JWT.sign(payload, privateKey, {
            expiresIn: '7 days',
        });

        // verify
        JWT.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.error(`error verify::`, err);
            } else {
                console.log(`decode verify:`, decode);
            }
        });

        return { accessToken, refreshToken };
    } catch (error) {}
};

module.exports = createTokenPair;
