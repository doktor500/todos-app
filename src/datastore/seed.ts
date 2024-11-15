import { usersRepositoryInstance } from "@/config/repositories/usersRepositoryInstance";
import uniqueIdGenerator from "@/modules/domain/shared/uniqueIdGenerator";
import { hash } from "@/modules/domain/utils/encryptionUtils";
import { client } from "@/modules/infrastructure/repositories/db";
import { aTodo } from "@/test/fixtures/todo.fixture";
import { aUser } from "@/test/fixtures/user.fixture";

const usersRepository = usersRepositoryInstance();

const seed = async () => {
  const todo1 = aTodo({ id: uniqueIdGenerator.uuid(), content: "Buy milk", index: 1 });
  const todo2 = aTodo({ id: uniqueIdGenerator.uuid(), content: "Buy bread", completed: true, index: 2 });
  const hashedPassword = await hash("password", process.env.ENCRYPTION_SALT);
  const user = aUser({
    id: 1,
    username: "david",
    email: "david@email.com",
    todos: [todo1, todo2],
    password: hashedPassword,
  });

  await usersRepository.deleteAll();
  await usersRepository.save(user);
  await client.end();
};

seed().catch(console.error);
