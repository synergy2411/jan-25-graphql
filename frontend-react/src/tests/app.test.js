// import { sum } from "./utils";
const { sum, getFirstName } = require("./utils");

test("should return first name when full name is given", () => {
  const result = getFirstName("John Doe");
  expect(result).toEqual("John");
});

test("should return the sum of two numbers", () => {
  let result = sum(2, 4);
  expect(result).toEqual(6);
});

test("should pass the truthy test", () => {
  expect(true).toBeTruthy();
});
