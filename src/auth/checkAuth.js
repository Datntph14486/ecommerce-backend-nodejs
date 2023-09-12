'use strict';

const { findById } = require('../services/apiKey.service');

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization',
};

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();
        if (!key) {
            return res.status(403).json({
                message: 'Forbidden Error',
            });
        }

        // check object key
        const objectKey = await findById(key);
        if (!objectKey) {
            return res.status(403).json({
                message: 'Forbidden Error',
            });
        }

        req.objectKey = objectKey;
        return next();
    } catch (error) {
        console.error(error);
    }
};

const permission = (permission) => {
    return (req, res, next) => {
        if (!req.objectKey.permissions) {
            return res.status(403).json({
                message: 'permission denied',
            });
        }

        console.log('permissions:', req.objectKey.permissions);
        const validPermission = req.objectKey.permissions.includes(permission);

        if (!validPermission) {
            return res.status(403).json({
                message: 'permission denied',
            });
        }

        return next();
    };
};

const asyncHandler = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    };
};

module.exports = {
    apiKey,
    permission,
    asyncHandler,
};
