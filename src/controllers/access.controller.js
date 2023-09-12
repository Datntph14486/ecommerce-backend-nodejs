'use strict';

const AccessService = require('../services/access.service');

class AccessController {
    signUp = async (req, res, next) => {
        try {
            console.log(`[p]::signUp::`, req.body);
            /*
                200: oke
                201: created
            */

            return res.status(201).json(await AccessService.signUp(req.body));
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new AccessController();
