import { redirect } from "next/navigation";

import { Todos } from "@/components/Todos";
import { usersRepository } from "@/modules/infrastructure/repositories/usersDBRepository";

type Params = { params: { id: number } };

const Page = async ({ params }: Params) => {
  const user = await usersRepository.findById(params.id);
  if (!user) return redirect("/");

  return (
    <>
      <h1 className="pt-4 text-center text-2xl font-bold">Inbox</h1>
      <Todos user={user} />
    </>
  );
};

export default Page;
