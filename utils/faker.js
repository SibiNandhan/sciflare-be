const { faker } = require("@faker-js/faker");

exports.createRandomUser = (orgId, password, isAdmin) => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: password,
    isAdmin: isAdmin,
    orgId,
  };
};
