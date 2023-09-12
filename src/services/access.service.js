'use strict';

const ROLE_SHOP = require('../constants');
const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require('./keyToken.service');
const createTokenPair = require('../auth/authUtils');
const { getInfoData } = require('../utils');
const {
    BadRequestError,
    ConflictRequestError,
    AuthFailureError,
} = require('../core/error.response');
const { findByEmail } = require('./shop.service');

class AccessService {
    static login = async ({ email, password, refreshToken = null }) => {
        // check email in db
        const foundShop = await findByEmail({ email });

        if (!foundShop) {
            throw new BadRequestError('Shop not found');
        }
        // match password
        const match = bcrypt.compare(password, foundShop.password);

        if (!match) {
            throw new AuthFailureError('Authentication error');
        }

        //  created privateKey, publicKey

        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');

        await KeyTokenService;

        const tokens = await createTokenPair(
            { userId: shop._id, email },
            publicKey,
            privateKey,
        );

        return {
            shop: getInfoData({
                fileds: ['_id', 'name', 'email'],
                object: foundShop,
            }),
            tokens,
        };
    };

    static signUp = async ({ name, email, password }) => {
        // step 1 check email exists?
        const holderShop = await shopModel.findOne({ email }).lean();

        if (holderShop) {
            throw new BadRequestError('Error: Shop already registered!');
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

            const privateKey = crypto.randomBytes(64).toString('hex');
            const publicKey = crypto.randomBytes(64).toString('hex');

            // save collection keyStore

            const keyStore = await KeyTokenService.createKeyToken({
                userId: newShop._id,
                publicKey,
                privateKey,
            });

            if (!keyStore) {
                return {
                    code: 'xxxx',
                    message: 'publicKeyString error',
                };
            }

            //  created token pair
            const tokens = await createTokenPair(
                { userId: newShop._id, email },
                publicKey,
                privateKey,
            );

            return {
                code: 201,
                metadata: {
                    shop: getInfoData({
                        fileds: ['_id', 'name', 'email'],
                        object: newShop,
                    }),
                    tokens,
                },
            };
        }

        return {
            code: 200,
            metadata: null,
        };
    };
}

module.exports = AccessService;
