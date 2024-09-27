import { client } from "@/modules/infrastructure/db";
import { aTodo } from "@/test/fixtures/todo.fixture";
import { aUser } from "@/test/fixtures/user.fixture";
import { usersTestRepository } from "@/test/repositories/usersTestRepository";

const seed = async () => {
  const todo1 = aTodo({ content: "Buy milk" });
  const todo2 = aTodo({ content: "Buy bread", completed: true });
  const user = aUser({ id: 1, name: "David", todos: [todo1, todo2] });

  await usersTestRepository.deleteAll();
  await usersTestRepository.save(user);
  await client.end();
};

seed().catch(console.error);
