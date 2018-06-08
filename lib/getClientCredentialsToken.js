const ClientOAuth2 = require('client-oauth2')

let auth = null;

module.exports.register = function (options, dependencies, next) {
    auth = new ClientOAuth2(options);
    next();
};

module.exports.execute = function (callback) {
    if (!auth) {
        return callback(new Error('oc-plugin-oauth2-client has not been initialised or initialisation has failed'));
    }

    return auth.credentials.getToken()
        .then(user => {
            callback(null, user.data);
        })
        .catch(err => callback(err));
};