import { usersRepositoryInstance } from "@/config/repositories/usersRepository";
import { client } from "@/modules/infrastructure/repositories/db";
import { aTodo } from "@/test/fixtures/todo.fixture";
import { aUser } from "@/test/fixtures/user.fixture";

const usersRepository = usersRepositoryInstance();

const seed = async () => {
  const todo1 = aTodo({ id: 1, content: "Buy milk" });
  const todo2 = aTodo({ id: 2, content: "Buy bread", completed: true });
  const user = aUser({ id: 1, name: "David", todos: [todo1, todo2] });

  await usersRepository.deleteAll();
  await usersRepository.save(user);
  await client.end();
};

seed().catch(console.error);
