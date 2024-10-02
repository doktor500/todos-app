import { test as setup } from "@playwright/test";

import { aUser } from "@/test/fixtures/user.fixture";
import { getUsersRepository } from "@/test/integration/application/repositories/usersTestRepository";

const userId = 1;
const usersRepository = getUsersRepository();

setup("setup browser tests context", async () => {
  await resetRepositories();
});

const resetRepositories = async () => {
  const user = aUser({ id: userId, name: "David", todos: [] });

  await usersRepository.deleteAll();
  await usersRepository.save(user);
};
