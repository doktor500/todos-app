import { test as setup } from "@playwright/test";

import { usersRepositoryInstance } from "@/config/repositories/usersRepositoryInstance";
import { aUser } from "@/test/fixtures/user.fixture";

const userId = 1;
const usersRepository = usersRepositoryInstance();

setup("setup browser tests context", async () => {
  await resetRepositories();
});

const resetRepositories = async () => {
  const user = aUser({ id: userId, username: "david", todos: [], email: "david@email.com", password: "password" });

  await usersRepository.deleteAll();
  await usersRepository.save(user);
};
