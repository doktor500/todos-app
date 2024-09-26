import { usersRepository } from "@/modules/infrastructure/usersDBRepository";

type Params = { params: { id: string } };

const Page = async ({ params }: Params) => {
    const user = await usersRepository.findById(params.id);
    if (!user) return null; //TODO redirect to login page

    return (
        <div className="flex flex-col justify-center items-center pt-10">
            <ul className="pt-5">
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