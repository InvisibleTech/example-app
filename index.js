const recipe = require("./triggers/recipe");
const recipe_create = require("./creates/recipe");

const addApiKeyToHeader = (request, z, bundle) => {
  request.headers["MY-AUTH-HEADER"] = bundle.authData.apiKey;
  return request;
};

module.exports = {
  // This is just shorthand to reference the installed dependencies you have.
  // Zapier will need to know these before we can upload.
  version: require("./package.json").version,
  platformVersion: require("zapier-platform-core").version,

  authentication: {
    type: "custom",
    fields: [{ key: "apiKey", type: "string" }],
    test: (z, bundle) => {
      const promise = z.request(
        "http://57b20fb546b57d1100a3c405.mockapi.io/api/me"
      );
      return promise.then((response) => {
        if (response.status !== 200) {
          throw new Error("Invalid API Key");
        }
      });
    },
  },

  // Before every outbound request do these
  beforeRequest: [addApiKeyToHeader],

  // If you want your trigger to show up, you better include it here!
  triggers: {
    [recipe.key]: recipe,
  },

  // If you want your searches to show up, you better include it here!
  searches: {},

  // If you want your creates to show up, you better include it here!
  creates: {
    [recipe_create.key]: recipe_create,
  },

  resources: {},
};
