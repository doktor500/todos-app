/* eslint-disable no-restricted-imports */
import { usersTestRepository } from "../repositories/usersTestRepository";

export const teardown = async () => {
  await usersTestRepository.deleteAll();
  await usersTestRepository.end();
};
