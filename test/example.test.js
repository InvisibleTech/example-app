/* globals describe, it, expect */
const should = require("should");

const zapier = require("zapier-platform-core");

const App = require("../index");
const appTester = zapier.createAppTester(App);

describe("My App", () => {
  it("should load recipes", (done) => {
    const bundle = {
      inputData: {
        style: "mediterranean",
      },
    };

    appTester(App.triggers.recipe.operation.perform, bundle)
      .then((results) => {
        should(results.length).above(1);

        const firstResult = results[0];
        console.log("test result: ", firstResult);
        should(firstResult.name).startWith("name ");
        should(firstResult.directions).startWith("directions ");

        done();
      })
      .catch(done);
  });
});
