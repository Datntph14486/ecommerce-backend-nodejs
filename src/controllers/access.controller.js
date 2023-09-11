'use strict';

class AccessController {
    signUp = async (req, res, next) => {
        try {
            console.log(`[p]::signUp::`, req.body);
            /*
                200: oke
                201: created
            */
            return res.status(201).json({
                code: '201',
                metadata: { userId: 1 },
            });
        } catch (error) {}
    };
}

module.exports = new AccessController();
