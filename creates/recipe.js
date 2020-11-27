// We recommend writing your creates separate like this and rolling them
// into the App definition at the end.
module.exports = {
  key: "recipe",

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: "Recipe",
  display: {
    label: "Create Recipe",
    description: "Creates a new recipe.",
  },

  // `operation` is where the business logic goes.
  operation: {
    inputFields: [{ key: "name", required: true, type: "string" }],
    perform: (z, bundle) => {
      z.console.log(">>>>>>>>>>>>>>>>>>>>>>>>>  Performing POST with bundle");
      z.console.log(bundle);
      z.console.log(">>>>>>>>>>>>>>>>>>>>>>>>>> Performing POST with bundle");
      z.console.log(">>>>>>>>>>>>>>>>>>>>>>>>>  Performing POST with z");
      z.console.log(z);
      z.console.log(">>>>>>>>>>>>>>>>>>>>>>>>>> Performing POST with z");
      const promise = z.request({
        url: "https://op-rule-hook-spike.herokuapp.com/dump_req_allow",
        method: "POST",
        body: {
          name: bundle.inputData.name,
        },
        headers: {
          "content-type": "application/json",

          // This is NOT how you normally do authentication. This is just to demo how to write a create here.
          // Refer to this doc to set up authentication:
          // https://zapier.github.io/zapier-platform-cli/#authentication
          "X-API-Key": "secret",
        },
      });

      return promise.then((response) => response.data);
    },

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obviously dummy values that we can show to any user.
    sample: {
      id: 1,
      createdAt: 1472069465,
      name: "Natto and Chocolate",
    },

    // If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
    // field definitions. The result will be used to augment the sample.
    // outputFields: () => { return []; }
    // Alternatively, a static field definition should be provided, to specify labels for the fields
    outputFields: [
      { key: "id", label: "ID" },
      { key: "createdAt", label: "Created At" },
      { key: "name", label: "Name" },
    ],
  },
};
