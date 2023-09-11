'use strict';
const express = require('express');
const router = express.Router();

router.get('', (req, res, next) => {
    const strCompress = 'Hello';
    return res.status(200).json({
        message: 'Welcome',
        metadata: strCompress.repeat(1000000),
    });
});

module.exports = router;
