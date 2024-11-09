import { test as setup } from "@playwright/test";

import { usersRepositoryInstance } from "@/config/repositories/usersRepositoryInstance";
import { authCookie } from "@/modules/domain/shared/authService";
import { encrypt } from "@/modules/domain/utils/encryptionUtils";
import { aUser } from "@/test/fixtures/user.fixture";

const userId = 1;
const baseUrl = `http://localhost:${process.env.PORT}`;

const usersRepository = usersRepositoryInstance();

setup("setup browser tests context", async ({ context }) => {
  const encryptedCookieValue = await encrypt({ userId });
  const cookie = { name: authCookie.name, value: encryptedCookieValue, url: baseUrl };

  await context.addCookies([cookie]);
  await context.storageState({ path: "playwright-storage.json" });
  await resetRepositories();
});

const resetRepositories = async () => {
  const user = aUser({ id: userId, username: "david", todos: [], email: "david@email.com", password: "password" });

  await usersRepository.deleteAll();
  await usersRepository.save(user);
};
