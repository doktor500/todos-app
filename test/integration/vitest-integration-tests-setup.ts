import { client } from "@/modules/infrastructure/db";
import { usersTestRepository } from "@/test/repositories/usersTestRepository";

export const setup = async () => {
  await usersTestRepository.deleteAll();
};

export const teardown = async () => {
  await usersTestRepository.deleteAll();
  await client.end();
};
