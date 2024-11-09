import { test as setup } from "@playwright/test";

import { usersRepositoryInstance } from "@/config/repositories/usersRepositoryInstance";
import { authCookie } from "@/modules/domain/shared/authService";
import { aUser } from "@/test/fixtures/user.fixture";

const userId = 1;
const baseUrl = `http://localhost:${process.env.PORT}`;

const usersRepository = usersRepositoryInstance();

setup("setup browser tests context", async ({ context }) => {
  const authSessionCookie = JSON.stringify({ userId });
  await context.addCookies([{ name: authCookie.name, value: authSessionCookie, url: baseUrl }]);
  await context.storageState({ path: "playwright-storage.json" });
  await resetRepositories();
});

const resetRepositories = async () => {
  const user = aUser({ id: userId, username: "david", todos: [], email: "david@email.com", password: "password" });

  await usersRepository.deleteAll();
  await usersRepository.save(user);
};
