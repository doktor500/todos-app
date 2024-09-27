import { redirect } from "next/navigation";

import { CreateTodoForm } from "@/components/app/CreateTodoForm";
import { TodoList } from "@/components/app/TodoList";
import { usersRepository } from "@/modules/infrastructure/repositories/usersDBRepository";

type Params = { params: { id: number } };

const Page = async ({ params }: Params) => {
  const user = await usersRepository.findById(params.id);
  if (!user) return redirect("/");

  return (
    <>
      <h1 className="pt-12 text-center text-2xl font-bold">Inbox</h1>
      <div className="flex cursor-pointer flex-col items-center justify-center pt-3">
        <CreateTodoForm userId={user.id} />
        <TodoList userId={user.id} todos={user.todos} />
      </div>
    </>
  );
};

export default Page;
