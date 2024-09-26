import { faker } from "@faker-js/faker";

export const randomDataGenerator = {
  aNumber: () => faker.number.int({ max: 99999999 }),
  aString: () => faker.lorem.words(2),
};
