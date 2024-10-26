import { usersRepositoryInstance } from "@/config/repositories/usersRepository";
import { uuid } from "@/modules/domain/utils/uniqueIdGenerator";
import { client } from "@/modules/infrastructure/repositories/db";
import { aTodo } from "@/test/fixtures/todo.fixture";
import { aUser } from "@/test/fixtures/user.fixture";

const usersRepository = usersRepositoryInstance();

const seed = async () => {
  const todo1 = aTodo({ id: uuid(), content: "Buy milk" });
  const todo2 = aTodo({ id: uuid(), content: "Buy bread", completed: true });
  const user = aUser({ id: 1, username: "David", todos: [todo1, todo2] });

  await usersRepository.deleteAll();
  await usersRepository.save(user);
  await client.end();
};

seed().catch(console.error);
