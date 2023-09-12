'use strict';

const StatusCode = {
    FORBIDDEN: 403,
    CONFLICT: 409,
};

const ReasonStatusCode = {
    FORBIDDEN: 'Bab request error',
    CONFLICT: 'Conflict error',
};

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(
        message = ReasonStatusCode.CONFLICT,
        statuscode = StatusCode.FORBIDDEN,
    ) {
        super(message, statuscode);
    }
}

class BadRequestError extends ErrorResponse {
    constructor(
        message = ReasonStatusCode.CONFLICT,
        statuscode = StatusCode.FORBIDDEN,
    ) {
        super(message, statuscode);
    }
}

module.exports = {
    ConflictRequestError,
    BadRequestError,
};
