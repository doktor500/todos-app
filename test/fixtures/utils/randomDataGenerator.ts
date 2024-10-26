import { faker } from "@faker-js/faker";

export const randomDataGenerator = {
  anId: () => faker.string.uuid(),
  anEmail: () => faker.internet.email(),
  aNumber: () => faker.number.int({ max: 99999999 }),
  aPassword: () => faker.internet.password(),
  aString: () => faker.lorem.words(2),
};
