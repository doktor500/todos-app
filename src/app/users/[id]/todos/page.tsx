import { usersRepository } from "@/modules/infrastructure/repositories/usersDBRepository";

type Params = { params: { id: number } };

const Page = async ({ params }: Params) => {
  const user = await usersRepository.findById(params.id);
  if (!user) return null; //TODO redirect to login page

  return (
    <>
      <h1 className="pt-10 text-center text-2xl font-bold">Todo list</h1>
      <div className="flex flex-col items-center justify-center">
        <ul className="text-center text-sm sm:text-left">
          {user.todos.map((todo) => (
            <li key={todo.id} className="pt-3">
              <span>{todo.content}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Page;
