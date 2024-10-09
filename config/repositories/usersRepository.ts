import { usersRepository as usersFakeRepository } from "@/fakes/modules/infrastructure/repositories/usersRepository";
import { isLocalEnvironment } from "@/modules/infrastructure/systemUtils.mjs";
import { usersTestRepository } from "@/test/integration/application/repositories/usersTestRepository";

export const usersRepositoryInstance = () => {
  return isLocalEnvironment() ? usersFakeRepository : usersTestRepository;
};
