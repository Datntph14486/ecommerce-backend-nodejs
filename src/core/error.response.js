'use strict';

const { ReasonPhrases, StatusCodes } = require('../utils/httpStatusCode');

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(
        message = ReasonPhrases.CONFLICT,
        statuscode = StatusCodes.FORBIDDEN,
    ) {
        super(message, statuscode);
    }
}

class BadRequestError extends ErrorResponse {
    constructor(
        message = ReasonPhrases.CONFLICT,
        statuscode = StatusCodes.FORBIDDEN,
    ) {
        super(message, statuscode);
    }
}

class AuthFailureError extends ErrorResponse {
    constructor(
        message = ReasonPhrases.UNAUTHORIZED,
        statuscode = StatusCodes.UNAUTHORIZED,
    ) {
        super(message, statuscode);
    }
}

module.exports = {
    ConflictRequestError,
    BadRequestError,
    AuthFailureError,
};
