import request from "supertest";
import app from "../server.js";

describe("Products", () => {
  describe("/api/products", () => {
    describe("GET", () => {
      test("200: should return an array of all products", () => {
        return request(app)
          .get("/api/products")
          .expect(200)
          .then(({ body }) => {
            expect(body).toBeInstanceOf(Array);
            expect(body).not.toHaveLength(0);
            body.forEach((product) => {
              expect(product).toHaveProperty("_id", expect.any(String));
              expect(product).toHaveProperty("name", expect.any(String));
              expect(product).toHaveProperty("description", expect.any(String));
              expect(product).toHaveProperty("price", expect.any(String));
              expect(product).toHaveProperty("siteLink", expect.any(String));
              expect(product).toHaveProperty("pictureLink", expect.any(String));
              expect(product).toHaveProperty("category", expect.any(String));
              expect(product).toHaveProperty("supermarket", expect.any(String));
              expect(product).toHaveProperty("reviews", expect.any(Array));
              expect(product).toHaveProperty("createdAt", expect.any(String));
              expect(product).toHaveProperty("updatedAt", expect.any(String));
            });
          });
      });
    });
  });
});

describe("Product", () => {
  describe("/api/products/:id", () => {
    describe("GET", () => {
      test("200: should return a single product identified by ID params", () => {
        return request(app)
          .get("/api/products/637639c183bc64444c1db707")
          .expect(200)
          .then(({ body }) => {
            const testProduct = {
              _id: "637639c183bc64444c1db707",
              name: "Big Loaf",
              description: "Bread",
              price: "£3.59",
              siteLink:
                "https://www.lidl.co.uk//p/floralys/floralys-paper-handkerchiefs/p976",
              pictureLink:
                "https://uk.cat-ret.assets.lidl/catalog5media/uk/article/126479/xs/126479_31.jpg",
              category: "bread",
              supermarket: "lidl",
              reviews: [],
              __v: 0,
              createdAt: "2022-11-17T13:40:17.712Z",
              updatedAt: "2022-11-17T13:40:17.712Z",
            };
            const product = body;
            expect(product).toBeInstanceOf(Object);
            expect(product).toEqual(testProduct);
          });
      });
      test("404: should return an error when product is not found for id", () => {
        return request(app)
          .get("/api/products/637639c183bc64444c1db768")
          .expect(404)
          .then(({ body }) => {});
      });
    });
  });
});
