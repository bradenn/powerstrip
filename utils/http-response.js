function httpResponse(status, message, object) {
   return {status, message, object, success: true};
}

function httpError(status, message, object) {
    return {status, message, object, success: false};
}

module.exports = {httpResponse, httpError};