import { redirect } from "next/navigation";

import { CreateTodoForm } from "@/components/app/CreateTodoForm";
import { TodoCheckbox } from "@/components/app/TodoCheckbox";
import { usersRepository } from "@/modules/infrastructure/repositories/usersDBRepository";

type Params = { params: { id: number } };

const Page = async ({ params }: Params) => {
  const user = await usersRepository.findById(params.id);
  if (!user) return redirect("/");

  return (
    <>
      <h1 className="pt-12 text-center text-2xl font-bold">Inbox</h1>
      <div className="flex cursor-pointer items-center justify-center pt-3">
        <ul>
          <li>
            <CreateTodoForm userId={user.id} />
          </li>
          {user.todos.map((todo) => (
            <li key={todo.id} className="pt-1">
              <TodoCheckbox
                userId={user.id}
                todoId={todo.id}
                content={todo.content}
                completed={todo.completed}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Page;
