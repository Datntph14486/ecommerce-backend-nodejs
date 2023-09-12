'use strict';

const JWT = require('jsonwebtoken');

const createTokenPair = async (payload, publicKey, privateKey) => {
    console.log('🚀 ~ payload:', payload);
    try {
        // access token
        const accessToken = await JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '2 days',
        });

        // refreshToken
        const refreshToken = await JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
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
