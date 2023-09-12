'use strict';

const StatusCode = {
    OKE: 200,
    CREATED: 201,
};

const ReasonStatusCode = {
    OKE: 'Success',
    CREATED: 'Created !',
};

class SuccessResponse {
    constructor({
        message,
        statusCode = StatusCode.OKE,
        reasonStatuscode = ReasonStatusCode.OKE,
        metadata = {},
    }) {
        this.message = !message ? reasonStatuscode : message;
        this.status = statusCode;
        this.metadata = metadata;
    }

    send(res, headers = {}) {
        return res.status(this.status).json(this);
    }
}

class OK extends SuccessResponse {
    constructor({ message, metadata }) {
        super({ message, metadata });
    }
}

class CREATED extends SuccessResponse {
    constructor({
        message,
        statusCode = StatusCode.CREATED,
        reasonStatuscode = ReasonStatusCode.CREATED,
        metadata,
    }) {
        super({ message, statusCode, reasonStatuscode, metadata });
    }
}

module.exports = {
    OK,
    CREATED,
};
