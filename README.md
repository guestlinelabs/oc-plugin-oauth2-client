# oc-plugin-oauth2-client
[OpenComponents](https://github.com/opencomponents/oc) plugin for integration with [OAUTH2](https://oauth.net/2/). Currently supports only fetching client credentials token.

# Requirements
* Node version: min 6
* [OC Registry](https://github.com/opencomponents/oc)

# Install
`npm i oc-plugin-oauth2-client --save`

# Registry setup
More information regarding integrating OpenComponents plugins can be found [here](https://github.com/opencomponents/oc/wiki/Registry#plugins).

```javascript
const registry = oc.registry(configuration);

registry.register({
    name: 'getOAUTH2Token',
    register: require('oc-plugin-oauth2-client').getClientCredentialsToken,
    options: {
        clientId: '<id of your application in oauth2 server>',
        clientSecret: '<client secret assigned to your application>',
        accessTokenUri: '<https://example.server/connect/token>',
        authorizationUri: '<https://example.server/connect/authorize>',
        redirectUri: '<redirect uri assigned to your application>',
        scopes: ['list', 'of', 'required', 'scopes']
    }
})
```

# Usage inside components
```javascript
module.exports.data = (context, callback) => {
  context.plugins.getOAUTH2Token((error, generatedToken) => {
    if (error) {
      // Handle errors that occured while obtaining token
      callback(error);
    }

    // generatedToken ->
    // { access_token: '<generatedToken>',
    //   expires_in: 60,
    //   token_type: 'Bearer'
    // }
    callback(null, { generatedToken: generatedToken });
  });
};
```