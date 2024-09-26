import { usersRepository } from "@/modules/infrastructure/repositories/usersDBRepository";

type Params = { params: { id: number } };

const Page = async ({ params }: Params) => {
    const user = await usersRepository.findById(params.id);
    if (!user) return null; //TODO redirect to login page

    return (
        <div className="flex flex-col justify-center items-center">
            <ul>
                {user.todos.map(todo => (
                    <li key={todo.id} className="pt-3">
                        <span>{todo.content}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Page;