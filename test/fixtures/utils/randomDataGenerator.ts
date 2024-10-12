import { faker } from "@faker-js/faker";

export const randomDataGenerator = {
  anId: () => faker.string.uuid(),
  aNumber: () => faker.number.int({ max: 99999999 }),
  aString: () => faker.lorem.words(2),
};
