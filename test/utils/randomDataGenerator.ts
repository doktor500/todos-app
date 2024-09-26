import { faker } from "@faker-js/faker";

export const randomDataGenerator = {
    anId: () => faker.string.uuid(),
    aString: () => faker.lorem.words(2),
}