'use strict';

const ROLE_SHOP = require('../constants');
const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require('./keyToken.service');
const createTokenPair = require('../auth/authUtils');

class AccessService {
    static signUp = async ({ name, email, password }) => {
        try {
            // step 1 check email exists?
            const holderShop = await shopModel.findOne({ email }).lean();
            console.log('🚀 ~ holderShop:', holderShop);
            if (holderShop) {
                return {
                    code: 'xxxx',
                    message: 'Shop already registered',
                };
            }

            const passwordHas = await bcrypt.hash(password, 10);

            const newShop = await shopModel.create({
                name,
                email,
                password: passwordHas,
                roles: [ROLE_SHOP.SHOP],
            });

            if (newShop) {
                //  created privateKey, publicKey
                const { privateKey, publicKey } = crypto.generateKeyPairSync(
                    'rsa',
                    {
                        modulusLength: 4096,
                        publicKeyEncoding: {
                            type: 'pkcs1',
                            format: 'pem',
                        },
                        privateKeyEncoding: {
                            type: 'pkcs1',
                            format: 'pem',
                        },
                    },
                );
                console.log('🚀 ~ privateKey:', privateKey);

                // save collection keyStore

                const publicKeyString = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                });

                if (!publicKeyString) {
                    return {
                        code: 'xxxx',
                        message: 'publicKeyString error',
                    };
                }

                const publicKeyObject = crypto.createPublicKey(publicKeyString);
                console.log('🚀 ~ publicKeyObject:', publicKeyObject);

                //  created token pair
                const tokens = await createTokenPair(
                    { userId: newShop._id, email },
                    publicKeyString,
                    privateKey,
                );

                console.log(`Created Token Success:`, tokens);

                return {
                    code: 201,
                    metadata: {
                        shop: newShop,
                        tokens,
                    },
                };
            }

            return {
                code: 200,
                metadata: null,
            };
        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error',
            };
        }
    };
}

module.exports = AccessService;
