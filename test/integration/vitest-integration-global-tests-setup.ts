import { client } from "@/modules/infrastructure/repositories/db";
import { usersTestRepository } from "@/test/integration/application/repositories/usersTestRepository";

process.env.SKIP_ENV_VALIDATION = "true";

export const setup = async () => {
  await usersTestRepository.deleteAll();
};

export const teardown = async () => {
  await usersTestRepository.deleteAll();
  await client.end();
};
