'use strict';

const { ROLE_SHOP } = require('../constants');
const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

class AccessService {
    static signUp = async ({ name, email, password }) => {
        try {
            // step 1 check email exists?
            const holderShop = await shopModel.findOne({ email }).lean();
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
                roles: ROLE_SHOP.SHOP,
            });

            if (newShop) {
                //  created privateKey, publicKey
                const { privateKey, publicKey } = crypto.generateKeyPairSync(
                    'rsa',
                    {
                        modulusLength: 4096,
                    },
                );
                console.log('🚀 ~ privateKey:', privateKey);

                // save collection keyStore

                console.log('🚀 ~ publicKey:', publicKey);
            }
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
