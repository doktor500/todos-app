import { PlusIcon } from "lucide-react";

import { Checkbox } from "@/ui/Checkbox";
import { usersRepository } from "@/modules/infrastructure/repositories/usersDBRepository";

type Params = { params: { id: number } };

const Page = async ({ params }: Params) => {
  const user = await usersRepository.findById(params.id);
  if (!user) return null; //TODO redirect to login page

  return (
    <>
      <h1 className="pt-12 text-center text-2xl font-bold">Todo list</h1>
      <div className="flex cursor-pointer items-center justify-center pt-3">
        <ul>
          <li>
            <div className="h-11 w-96 rounded-sm bg-black/20 pl-4 pt-3 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/30">
              <div className="flex items-center text-gray-800 dark:text-white">
                <PlusIcon size="20" />
                <form>
                  <input
                    type="text"
                    placeholder="Add a to-do..."
                    className="w-80 border-none bg-transparent pl-1 text-sm outline-none"
                  />
                </form>
              </div>
            </div>
          </li>
          {user.todos.map((todo) => (
            <li key={todo.id} className="pt-1">
              <div className="h-11 w-96 rounded-sm bg-black/20 pl-4 pt-3 hover:bg-black/10 dark:bg-white/20 dark:hover:bg-white/40">
                <div className="flex items-center text-gray-800 dark:text-white">
                  <Checkbox id={`todo-${todo.id}`} />
                  <label htmlFor={`todo-${todo.id}`} className="pl-2 text-sm">
                    {todo.content}
                  </label>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Page;
