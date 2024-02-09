const { faker } = require("@faker-js/faker");

console.log("Hello world");

// console.log(faker.internet.email());
// console.log(faker.date.past());

function generateAddress() {
  console.log(faker.location.streetAddress());
  console.log(faker.location.city());
  console.log(faker.location.state());
}
// generateAddress();
