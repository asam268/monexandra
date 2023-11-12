const chai = require("chai");
const sinon = require("sinon");
// const sandbox = require("sinon").createSandbox();
const chaiHttp = require("chai-http");
const { expect } = chai;
const express = require("express");
// const { getRecipes, createRecipe } = require(__dirname + "/./../../db/controllers/recipes_controller");
const recipesController = require(__dirname + "/./../../db/controllers/recipes_controller");

chai.use(chaiHttp);

const routes = require("../../routes/recipes_routes");

const createFakeServer = () => {
  const app = express();
  app.use(express.json());
  app.use("/recipes", routes);
  return app;
};

describe("Recipes Routes", () => {
  let app;

  beforeEach(() => {
    app = createFakeServer();
  });

  it("should get all recipes", (done) => {
    chai
      .request(app)
      .get("/recipes")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("data");
        done();
      });
  });

  it("should create a new recipe", (done) => {
    chai
      .request(app)
      .post("/recipes")
      .send({
        name: "testrecipe",
        category: "testcategory",
        instructions: "test instructions",
        created_by: 1,
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.be.an("array");
        done();
      });
  });

});

describe("Error Handling", () => {
  let app;
  beforeEach(() => {
    const mockError = new Error("Database error");
    // const mockSelect = sinon.stub().rejects(mockError);
    // const mockRecipesDb = sinon.stub().returns({ select: mockSelect });
    // sandbox.stub(recipesController, "getRecipes").value(mockError);
    const mockGetRecipes = sinon.stub().rejects(mockError);
    sinon.replace(recipesController, "getRecipes", mockGetRecipes);
    app = createFakeServer();
  });
  it("should handle errors in GET route", (done) => {
  
    // sinon.replace(routes, , mockGetRecipes)
  
    
    chai
      .request(app)
      .get("/recipes")
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.have.property("error");
        mockGetRecipes.restore();
        done();
      });
  });
});
