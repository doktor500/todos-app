import { Checkbox } from "@/components/ui/checkbox";
import { usersRepository } from "@/modules/infrastructure/repositories/usersDBRepository";

type Params = { params: { id: number } };

const Page = async ({ params }: Params) => {
  const user = await usersRepository.findById(params.id);
  if (!user) return null; //TODO redirect to login page

  return (
    <>
      <h1 className="pt-12 text-center text-2xl font-bold">Todo list</h1>
      <div className="flex items-center justify-center pt-3">
        <ul>
          {user.todos.map((todo) => (
            <li key={todo.id} className="pt-1">
              <div className="h-11 w-96 rounded-sm bg-black/20 pl-4 pt-3 dark:bg-white/20">
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
